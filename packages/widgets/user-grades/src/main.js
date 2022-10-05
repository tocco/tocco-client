import PropTypes from 'prop-types'
import {appFactory} from 'tocco-app-extensions'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {env, appContext} from 'tocco-util'

import UserGrades from './components/UserGrades'

const packageName = 'user-grades'

const initApp = (id, input, events, publicPath) => {
  env.setInputEnvs(input)

  const content = <UserGrades />

  const store = appFactory.createStore({}, null, input, packageName)

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

      appFactory.renderApp(app.component)
    }
  }
})()

const UserGradesApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

UserGradesApp.propTypes = {
  reportIds: PropTypes.arrayOf(PropTypes.string),
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContext.propTypes.isRequired,
  searchFormType: searchFormTypePropTypes
}

export default UserGradesApp
export const app = appFactory.createBundleableApp(packageName, initApp, UserGradesApp)
