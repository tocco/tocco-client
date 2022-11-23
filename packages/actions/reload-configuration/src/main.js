import {appFactory, actionEmitter, notification, externalEvents} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import ConfigurationContainer from './components/ConfigurationContainer'
import reducers, {sagas} from './modules/reducers'

const packageName = 'reload-configuration'
const EXTERNAL_EVENTS = ['emitAction', 'onSuccess']

const initApp = (id, input, events, publicPath) => {
  const content = <ConfigurationContainer />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, state => state.input.emitAction)
  notification.addToStore(store, false)
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
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

const ReloadConfigurationApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

export default ReloadConfigurationApp
