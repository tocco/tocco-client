import {appFactory, selection} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import Leaderboard from './components/Leaderboard'
import reducers, {sagas} from './modules/reducers'

const packageName = 'leaderboard'

const initApp = (id, input, events, publicPath) => {
  const content = <Leaderboard />

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

const LeaderboardApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

LeaderboardApp.propTypes = {
  selection: selection.propType.isRequired
}

export default LeaderboardApp
export const app = appFactory.createBundleableApp(packageName, initApp, LeaderboardApp)
