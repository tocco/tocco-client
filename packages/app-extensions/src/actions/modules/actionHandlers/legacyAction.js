import _isPlainObject from 'lodash/isPlainObject'
import {call, all} from 'redux-saga/effects'

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

export function* initLegacyActionsEnv() {
  if (window.legacyActionsEnvInitialized !== true) {
    yield call(loadSequentially, sources)
    yield call(window.setUpLegacyActionsEnv)
  }
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
