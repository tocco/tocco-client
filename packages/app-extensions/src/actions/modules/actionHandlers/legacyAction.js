import _isPlainObject from 'lodash/isPlainObject'
import {channel} from 'redux-saga'
import {call, all, put, spawn, take, select} from 'redux-saga/effects'

import notifier from '../../../notifier'
import remoteEvents from '../../../remoteEvents'

export const loadScript = src => new Promise((resolve, reject) => {
  const s = document.createElement('script')
  s.src = src
  s.onload = resolve
  s.onerror = reject
  document.head.appendChild(s)
})

export const loadCss = src => new Promise((resolve, reject) => {
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
  for (const source of sources) {
    yield call(source.handler, source.src)
  }
}

export const sources = [
  {src: '/nice2/javascript/lang.release.js', handler: loadScript},
  {src: '/nice2/javascript/nice2-ext-newclient-actions.debug.js', handler: loadScript},
  {src: '/nice2/javascript/nice2-admin.debug.js', handler: loadScript},
  {src: '/nice2/javascript/nice2-newclient-actions-setup.debug.js', handler: loadScript},
  {src: '/nice2/dwr-all.js', handler: loadScript},
  {src: '/js/ext-extensions/ckeditor/ckeditor/ckeditor.js', handler: loadScript},
  {src: '/css/themes/blue-medium.css', handler: loadCss},
  {src: '/css/nice2-admin.css', handler: loadCss},
  {src: '/css/nice2-new-client-legacy-actions.css', handler: loadCss}
]

export const channelFeedingCallback = channel => arg => {
  channel.put(arg)
}

export function* readRemoteEvents(remoteEventsChannel) {
  while (true) {
    const event = yield take(remoteEventsChannel)
    const action = remoteEvents.remoteEvent(event)
    yield put(action)
  }
}

export function* registerRemoteEventsListener() {
  const remoteEventsChannel = yield call(channel)
  const callback = yield call(channelFeedingCallback, remoteEventsChannel)
  const dataRegistry = yield call([window.app, window.app.getDataRegistry])
  yield call([dataRegistry, dataRegistry.setNewClientCallback], callback)
  yield spawn(readRemoteEvents, remoteEventsChannel)
}

export function* handleNotification(notification) {
  const message = notification.message.replace(/&nbsp;/g, ' ')

  let action

  switch (notification.level) {
    case 'ERROR':
      action = notifier.info('error', null, message)
      break
    case 'INFO':
      action = notifier.info('info', null, message)
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
  const notificationsChannel = yield call(channel)
  const callback = yield call(channelFeedingCallback, notificationsChannel)
  const gui = yield call([window.app, window.app.getGui])
  const notifier = yield call([gui, gui.getNotifier])
  yield call([notifier, notifier.setNewClientCallback], callback)
  yield spawn(readNotifications, notificationsChannel)
}

export function* initLegacyActionsEnv() {
  if (window.legacyActionsEnvInitialized !== true) {
    yield call(loadSequentially, sources)
    yield call(window.setUpLegacyActionsEnv)
  }
  yield call(registerRemoteEventsListener)
  yield call(registerNotificationsListener)
}

export const listSelector = state => state.list

export const entityListSelector = state => state.entityList
export const entityDetailSelector = state => state.entityDetail

export const getOrderByString = sortingArray => sortingArray && sortingArray.length > 0
  ? sortingArray.map(item => `${item.field} ${item.order}`).join(', ')
  : null

export const getManualQuery = (selection, listState) => ({
  ...new window.nice2.netui.ManualQuery(),
  entityName: selection.entityName,
  queryWhere: selection.query.tql,
  queryOrderBy: getOrderByString(listState.sorting)
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
    legacySelection.selectedEntities = selection.ids
    legacySelection.selectionType = 'SELECTION'
  } else if (selection.type === 'QUERY') {
    const listState = yield select(listSelector)

    legacySelection.selectionType = 'NEW_CLIENT_QUERY'
    legacySelection.manualQuery = getManualQuery(selection, listState)
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
  yield call(initLegacyActionsEnv)

  const actionDefinition = new window.nice2.netui.actions.model.ClientActionDefinition(definition.id, definition.id)
  actionDefinition.setEnabled(!definition.readOnly)
  if (_isPlainObject(definition.properties)) {
    const setPropertyEffects = Object.entries(definition.properties)
      .map(([key, value]) => call([actionDefinition, actionDefinition.setProperty], key, value))
    yield all(setPropertyEffects)
  }

  const entityExplorer = new window.nice2.modules.NewClientLegacyActionsModule({
    entityName: selection.entityName,
    formName: selection.entityName
  })
  entityExplorer.init()

  const ctx = new window.nice2.modules.entityexplorer.EntityExplorerActionContext(entityExplorer, null)
  if (selection.type === 'ID' && selection.ids.length === 1) {
    ctx.getRecord = () => ({id: selection.ids[0]})
  }

  const situation = {
    entityName: selection.entityName,
    scope: definition.scope || (yield call(getScope))
  }

  const action = window.NetuiActionRegistry.newActionFromDefinition(actionDefinition, situation, ctx)

  const legacySelection = yield call(getSelection, selection)

  action.getSelectionNumber = () => selection.type === 'ID' ? selection.ids.length : 0
  action.getSelection = () => legacySelection

  action.perform()
}
