import {appFactory, selection} from 'tocco-app-extensions'
import {reducer as reducerUtil, appContext, env} from 'tocco-util'

import TournamentWidget from './components/TournamentWidget'
import reducers, {sagas} from './modules/reducers'

const packageName = 'bettinggame'

const initApp = (id, input, events, publicPath) => {
  const content = (
    <TournamentWidget formBase={input.formBase} tournamentKey={input.tournamentKey} entityName={input.entityName} />
  )

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

const BettinggameApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

BettinggameApp.propTypes = {
  appContext: appContext.propTypes.isRequired,
  selection: selection.propType.isRequired
}

export default BettinggameApp
export const app = appFactory.createBundleableApp(packageName, initApp, BettinggameApp)
