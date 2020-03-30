import _isPlainObject from 'lodash/isPlainObject'
import {channel} from 'redux-saga'
import {call, all, put, spawn, take} from 'redux-saga/effects'

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
  {src: '/css/themes/blue-medium.css', handler: loadCss},
  {src: '/css/nice2-admin.css', handler: loadCss}
]

export const entityEventCallback = remoteEventsChannel => event => {
  remoteEventsChannel.put(event)
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
  const callback = yield call(entityEventCallback, remoteEventsChannel)
  const dataRegistry = yield call([window.app, window.app.getDataRegistry])
  yield call([dataRegistry, dataRegistry.setNewClientCallback], callback)
  yield spawn(readRemoteEvents, remoteEventsChannel)
}

export function* initLegacyActionsEnv() {
  if (window.legacyActionsEnvInitialized !== true) {
    yield call(loadSequentially, sources)
    yield call(window.setUpLegacyActionsEnv)
  }
  yield call(registerRemoteEventsListener)
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

  const situation = {
    entityName: selection.entityName
  }

  const action = window.NetuiActionRegistry.newActionFromDefinition(actionDefinition, situation, ctx)

  action.getSelectionNumber = () => selection.ids.length
  action.getSelection = () => ({
    entityName: selection.entityName,
    selectedEntities: selection.ids
  })

  action.perform()
}
