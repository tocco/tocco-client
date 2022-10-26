import {appFactory} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import {initLoginApp, LoginApp} from './LoginApp'
import {initPasswordUpdateApp, PasswordUpdateApp} from './PasswordUpdateApp'

const packageName = 'login'

;(() => {
  if (__PACKAGE_NAME__ === packageName) {
    appFactory.registerAppInRegistry(packageName, initLoginApp)
    appFactory.registerAppInRegistry('password-update', initPasswordUpdateApp)

    if (__DEV__) {
      if (!__NO_MOCK__) {
        const fetchMock = require('fetch-mock').default
        fetchMock.config.overwriteRoutes = false
        const setupFetchMocks = require('./dev/fetchMocks').default
        setupFetchMocks(packageName, fetchMock)
      }

      const app = initLoginApp('id', require('./dev/login_input.json'))

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

export {PasswordUpdateApp}
export default LoginApp
export const app = appFactory.createBundleableApp(packageName, initLoginApp, LoginApp)
export const appPasswordUpdate = appFactory.createBundleableApp(
  'password-update',
  initPasswordUpdateApp,
  PasswordUpdateApp
)
