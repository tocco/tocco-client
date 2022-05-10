import {appFactory} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import {initPasswordUpdateApp, PasswordUpdateApp} from './PasswordUpdateApp'

const packageName = 'login'
const appName = 'password-update'

;(() => {
  if (__PACKAGE_NAME__ === packageName) {
    appFactory.registerAppInRegistry(appName, initPasswordUpdateApp)

    if (__DEV__) {
      if (!__NO_MOCK__) {
        const fetchMock = require('fetch-mock').default
        fetchMock.config.overwriteRoutes = false
        const setupFetchMocks = require('./dev/fetchMocks').default
        setupFetchMocks(packageName, fetchMock)
      }

      const app = initPasswordUpdateApp('id', require('./dev/password_update_input.json'))

      if (module.hot) {
        module.hot.accept('./modules/reducers', () => {
          const reducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, reducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

export default PasswordUpdateApp
