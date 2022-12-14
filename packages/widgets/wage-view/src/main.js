import PropTypes from 'prop-types'
import {appFactory, externalEvents} from 'tocco-app-extensions'
import {env, appContext} from 'tocco-util'

import WageView from './components/WageView'

const packageName = 'wage-view'

const EXTERNAL_EVENTS = ['onStateChange']

const initApp = (id, input, events, publicPath) => {
  env.setInputEnvs(input)

  const content = <WageView />

  const store = appFactory.createStore({}, null, input, packageName)

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
  reportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContext.propTypes.isRequired,
  ...externalEvents.createPropTypes(EXTERNAL_EVENTS)
}

export default WageViewApp
export const app = appFactory.createBundleableApp(packageName, initApp, WageViewApp)
