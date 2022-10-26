import PropTypes from 'prop-types'
import {appFactory, cache, errorLogging, externalEvents, notification} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import TwoFactorConnector from './components/TwoFactorConnector'
import reducers, {sagas} from './modules'

const packageName = 'two-factor-connector'

const initApp = (id, input, events, publicPath) => {
  const content = <TwoFactorConnector />

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  notification.addToStore(store, true)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))
  cache.addToStore(store)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
    publicPath,
    textResourceModules: ['component', 'common', packageName]
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
        module.hot.accept('./modules/reducer', () => {
          const hotReloadedReducers = require('./modules/reducer').default
          reducerUtil.hotReloadReducers(app.store, hotReloadedReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const EXTERNAL_EVENTS = ['onSuccess', 'onCancel', 'onResize']

const TwoFactorConnectorApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

TwoFactorConnectorApp.propTypes = {
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => ({...propTypes, [event]: PropTypes.func}), {}),
  username: PropTypes.string,
  password: PropTypes.string,
  secret: PropTypes.shape({
    secret: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }),
  forced: PropTypes.bool
}

export default TwoFactorConnectorApp
export const app = appFactory.createBundleableApp(packageName, initApp, TwoFactorConnectorApp)
