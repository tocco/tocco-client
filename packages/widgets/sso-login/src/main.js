import PropTypes from 'prop-types'
import {appFactory, cache, externalEvents} from 'tocco-app-extensions'
import {appContext, reducer as reducerUtil, env} from 'tocco-util'

import LoginBoxContainer from './containers/LoginBoxContainer'
import reducers, {sagas} from './modules'

const packageName = 'sso-login'

const EXTERNAL_EVENTS = ['loginCompleted']

const initApp = (id, input, events, publicPath) => {
  env.setInputEnvs(input)

  const content = <LoginBoxContainer />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
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
        module.hot.accept('./modules/index', () => {
          const hotReloadedReducers = require('./modules').default
          reducerUtil.hotReloadReducers(app.store, hotReloadedReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const SsoLoginApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

SsoLoginApp.propTypes = {
  ssoLoginEndpoint: PropTypes.string.isRequired,
  locale: PropTypes.string,
  autoLogin: PropTypes.bool,
  appContext: appContext.propTypes,
  businessUnit: PropTypes.string,
  redirectUrl: PropTypes.string
}

export default SsoLoginApp
export const app = appFactory.createBundleableApp(packageName, initApp, SsoLoginApp)
