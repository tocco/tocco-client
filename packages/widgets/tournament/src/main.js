import PropTypes from 'prop-types'
import {appFactory} from 'tocco-app-extensions'
import {env, reducer as reducerUtil, appContext} from 'tocco-util'

import Tournament from './components/Tournament'
import reducers, {sagas} from './modules/reducers'

const packageName = 'tournament'

const initApp = (id, input, events, publicPath) => {
  const content = <Tournament tournamentKey={input.tournamentKey} />

  env.setInputEnvs(input)

  const store = appFactory.createStore(reducers, sagas, input, packageName)

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
        module.hot.accept('./modules/reducers', () => {
          const hotReducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, hotReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const TournamentApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

TournamentApp.propTypes = {
  appContext: appContext.propTypes.isRequired,
  tournamentKey: PropTypes.string
}

export default TournamentApp
export const app = appFactory.createBundleableApp(packageName, initApp, TournamentApp)
