import PropTypes from 'prop-types'
import {appFactory, reports} from 'tocco-app-extensions'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {env, appContext as appContextPropType} from 'tocco-util'

import MailingList from './components/MailingList'

const packageName = 'mailing-list'

const initApp = (id, input, events, publicPath) => {
  env.setInputEnvs(input)

  const content = <MailingList />

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

const MailingListApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

MailingListApp.propTypes = {
  searchFormType: searchFormTypePropTypes,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired,
  reportIds: PropTypes.arrayOf(PropTypes.string),
  allowEmail: PropTypes.bool
}

export default MailingListApp
export const app = appFactory.createBundleableApp(packageName, initApp, MailingListApp)
