import PropTypes from 'prop-types'
import {appFactory, reports} from 'tocco-app-extensions'
import {env, appContext} from 'tocco-util'

import WageView from './components/WageView'

const packageName = 'wage-view'

const initApp = (id, input, events, publicPath) => {
  env.setInputEnvs(input)

  const content = <WageView />

  const store = appFactory.createStore({}, null, input, packageName)
  reports.addToStore(store)

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

      appFactory.renderApp(app.component)
    }
  }
})()

const WageViewApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

WageViewApp.propTypes = {
  allowCreate: PropTypes.bool,
  reports: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContext.propTypes.isRequired
}

export default WageViewApp
