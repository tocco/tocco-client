import PropTypes from 'prop-types'
import {actionEmitter, actions, appFactory, cache, errorLogging, notification} from 'tocco-app-extensions'
import {appContext, reducer as reducerUtil, env} from 'tocco-util'

import Action from './components/Action'
import InputEdit from './components/InputEdit/InputEditContainer'
import customActions from './customActions'
import {setHandleNotifications} from './modules/inputEdit/actions'
import reducers, {sagas} from './modules/reducers'

const packageName = 'input-edit'

const EXTERNAL_EVENTS = ['emitAction']

const initApp = (id, input, events, publicPath) => {
  env.setInputEnvs(input)

  const content = <InputEdit />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, state => state.input.emitAction)
  actions.dynamicActionsAddToStore(store)
  actions.addToStore(store, () => ({
    customActions: customActions(input),
    appComponent: Action
  }))
  const handleNotifications = !events?.emitAction
  notification.addToStore(store, handleNotifications)
  errorLogging.addToStore(store, handleNotifications, ['console', 'remote', 'notification'])
  cache.addToStore(store)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [setHandleNotifications(handleNotifications)],
    publicPath,
    textResourceModules: ['component', 'common', 'actions', packageName]
  })
}

;(() => {
  if (__PACKAGE_NAME__ === packageName) {
    appFactory.registerAppInRegistry(packageName, initApp)

    if (__DEV__) {
      const input = require('./dev/input.json')

      if (!__NO_MOCK__) {
        const fetchMock = require('fetch-mock').default
        fetchMock.config.overwriteRoutes = false
        const setupFetchMocks = require('./dev/fetchMocks').default
        setupFetchMocks(packageName, fetchMock)
        fetchMock.spy()
      }

      const app = initApp(packageName, input)

      if (module.hot) {
        module.hot.accept('./modules/reducers', () => {
          const hotReducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, hotReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const InputEditApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

InputEditApp.propTypes = {
  selection: PropTypes.object,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {}),
  appContext: appContext.propTypes
}

export default InputEditApp
export const app = appFactory.createBundleableApp(packageName, initApp, InputEditApp)
