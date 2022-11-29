import _isPlainObject from 'lodash/isPlainObject'
import {channel} from 'redux-saga'
import {all, call, put, select, spawn, take} from 'redux-saga/effects'

import newNotification from '../../../notification'
import remoteEvents from '../../../remoteEvents'
import rest from '../../../rest'

const ignoredExceptionMessages = ['Single selection only, aborting...', 'Nothing selected, aborting...']
const entityDocsEntity = ['Folder', 'Resource']

export const loadScript = src =>
  new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })

export const loadCss = src =>
  new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = src
    link.media = 'all'
    link.onload = resolve
    link.onerror = reject
    head.appendChild(link)
  })

export function* loadSequentially(sources) {
  const currentEnv = window.legacyActionEnv || 'new'
  const serverSettings = yield call(rest.fetchServerSettings)
  for (const source of sources) {
    if (source.envs.includes(currentEnv)) {
      yield call(source.handler, `${source.src}?v=${serverSettings.niceRevision}`)
    }
  }
}

export const sources = [
  {src: '/nice2/javascript/lang.release.js', handler: loadScript, envs: ['new']},
  {src: '/nice2/javascript/nice2-ext-newclient-actions.release.js', handler: loadScript, envs: ['new']},
  {src: '/nice2/javascript/nice2-admin.release.js', handler: loadScript, envs: ['new']},
  {
    src: '/nice2/javascript/nice2-newclient-actions-public.release.js',
    handler: loadScript,
    envs: ['legacy-public']
  },
  {
    src: '/nice2/javascript/nice2-newclient-actions-setup.release.js',
    handler: loadScript,
    envs: ['legacy-public', 'legacy-admin', 'new']
  },
  {src: '/nice2/dwr-all.js', handler: loadScript, envs: ['new']},
  {src: '/js/ext-extensions/ckeditor/ckeditor/ckeditor.js', handler: loadScript, envs: ['new']},
  {src: '/css/themes/blue-medium.css', handler: loadCss, envs: ['new']},
  {src: '/css/nice2-admin.css', handler: loadCss, envs: ['new']},
  {src: '/css/nice2-new-client-legacy-actions.css', handler: loadCss, envs: ['new']}
]

export const channelFeedingCallback = (channel, responseChannel) => arg => {
  channel.put(arg)
  if (responseChannel) {
    responseChannel.put(arg)
  }
}

export function* readRemoteEvents(remoteEventsChannel) {
  while (true) {
    const event = yield take(remoteEventsChannel)
    const action = remoteEvents.remoteEvent(event)
    yield put(action)
  }
}

export function* registerRemoteEventsListener() {
  const dataRegistry = yield call([window.app, window.app.getDataRegistry])
  if (dataRegistry.setNewClientCallback) {
    const remoteEventsChannel = yield call(channel)
    const responseChannel = yield call(channel)
    const callback = yield call(channelFeedingCallback, remoteEventsChannel, responseChannel)
    yield call([dataRegistry, dataRegistry.setNewClientCallback], callback)
    yield spawn(readRemoteEvents, remoteEventsChannel)
    return responseChannel
  }
}

export function* handleNotification(notification) {
  const message = notification.message.replace(/&nbsp;/g, ' ')

  let action

  switch (notification.level) {
    case 'ERROR':
      action = newNotification.toaster({type: 'error', title: message})
      break
    case 'INFO':
      action = newNotification.toaster({type: 'info', title: message})
      break
    default:
      throw new Error(`Unsupported notification level: ${notification.level}`)
  }

  if (action) {
    yield put(action)
  }
}

export function* readNotifications(notificationsChannel) {
  while (true) {
    const notification = yield take(notificationsChannel)
    yield call(handleNotification, notification)
  }
}

export function* registerNotificationsListener() {
  const gui = yield call([window.app, window.app.getGui])
  const notifier = yield call([gui, gui.getNotifier])
  if (notifier.setNewClientCallback) {
    const notificationsChannel = yield call(channel)
    const callback = yield call(channelFeedingCallback, notificationsChannel)
    yield call([notifier, notifier.setNewClientCallback], callback)
    yield spawn(readNotifications, notificationsChannel)
  }
}

export function* initLegacyActionsEnv() {
  if (window.legacyActionsEnvInitialized !== true) {
    yield call(loadSequentially, sources)
    yield call(window.setUpLegacyActionsEnv)
  }
  yield call(registerNotificationsListener)
  return yield call(registerRemoteEventsListener)
}

export const listSelector = state => state.list

export const entityListSelector = state => state.entityList
export const entityDetailSelector = state => state.entityDetail

export const getManualQuery = selection => ({
  ...new window.nice2.netui.ManualQuery(),
  entityName: selection.entityName,
  queryWhere: selection.query.where
})

export const getListFormId = listState => ({
  ...new window.form.FormIdentifier(),
  scope: 'list',
  formName: listState.formDefinition.id
})

export function* getSelection(selection) {
  const legacySelection = {
    entityName: selection.entityName
  }

  if (selection.type === 'ID') {
    const isEntityDocsEntity = entityDocsEntity.includes(selection.entityName)
    legacySelection.selectedEntities = selection.ids
    legacySelection.selectionType = isEntityDocsEntity ? 'ENTITY_DOCS' : 'SELECTION'
  } else if (selection.type === 'QUERY') {
    const listState = yield select(listSelector)

    legacySelection.selectionType = 'NEW_CLIENT_QUERY'
    legacySelection.manualQuery = getManualQuery(selection)
    legacySelection.listForm = getListFormId(listState)
    legacySelection.searchFilters = selection.query.filter
  } else {
    throw new Error(`Unsupported selection type: ${selection.type}`)
  }

  return legacySelection
}

export function* getScope() {
  const list = yield select(entityListSelector)
  const detail = yield select(entityDetailSelector)

  if (list && detail) {
    throw new Error('Unable to get form scope. Unexpected state: entityList and entityDetail exist')
  }

  if (list) {
    return 'list'
  }

  if (detail) {
    if (detail.mode === 'update') {
      return 'detail'
    } else if (detail.mode === 'create') {
      return 'create'
    } else {
      throw new Error(`Unable to get form scope. Unexpected detail mode: ${detail.mode}`)
    }
  }

  throw new Error('Unable to get form scope. Expected to find either entityList or entityDetail in state')
}

export default function* (definition, selection, parent, params, config) {
  const responseChannel = yield call(initLegacyActionsEnv)

  const actionDefinition = new window.nice2.netui.actions.model.ClientActionDefinition(definition.path, definition.id)
  actionDefinition.setEnabled(!definition.readOnly)
  if (_isPlainObject(definition.properties)) {
    const setPropertyEffects = Object.entries(definition.properties).map(([key, value]) =>
      call([actionDefinition, actionDefinition.setProperty], key, value)
    )
    yield all(setPropertyEffects)
  }

  const entityExplorer = new window.nice2.modules.NewClientLegacyActionsModule({
    entityName: selection.entityName,
    formName: selection.entityName
  })
  entityExplorer.init()

  const panel = new window.nice2.modules.NewClientLegacyActionsPanel({
    entityName: selection.entityName
  })

  const ctx = new window.nice2.modules.entityexplorer.EntityExplorerActionContext(entityExplorer, panel)
  if (selection.type === 'ID' && selection.ids.length === 1) {
    ctx.getRecord = () => ({id: selection.ids[0]})
  }

  const situation = {
    entityName: selection.entityName,
    scope: definition.scope || (yield call(getScope))
  }

  const action = window.NetuiActionRegistry.newActionFromDefinition(actionDefinition, situation, ctx)

  const legacySelection = yield call(getSelection, selection)

  action.getSelectionNumber = () => (selection.type === 'ID' ? selection.ids.length : 0)
  action.getSelection = () => legacySelection

  try {
    action.perform()
  } catch (e) {
    const message = e instanceof Error ? e.message : e
    if (!ignoredExceptionMessages.includes(message)) {
      throw e
    }
  }

  if (responseChannel) {
    yield take(responseChannel)
    return {
      success: true
    }
  }
}
