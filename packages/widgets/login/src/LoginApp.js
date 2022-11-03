import PropTypes from 'prop-types'
import {appFactory, cache, errorLogging, externalEvents} from 'tocco-app-extensions'
import {env, appContext} from 'tocco-util'

import LoginContainer from './containers/LoginContainer'
import * as login from './modules/login/actions'
import * as passwordRequest from './modules/passwordRequest/actions'
import * as passwordUpdate from './modules/passwordUpdate/dialog/actions'
import loginReducers, {sagas} from './modules/reducers'

const packageName = 'login'

const EXTERNAL_EVENTS = ['loginSuccess', 'resize']

export const initLoginApp = (id, input, events, publicPath, customTheme) => {
  const actions = [
    passwordUpdate.setShowOldPasswordField(false),
    passwordUpdate.setStandalone(false),
    passwordRequest.setPasswordRequest(!!input.passwordRequest),
    login.setUsername(input.username || '')
  ]

  const showTitle = !!input.showTitle
  const content = <LoginContainer showTitle={showTitle} />

  const store = appFactory.createStore(loginReducers, sagas, input, packageName)

  env.setInputEnvs(input)

  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))
  errorLogging.addToStore(store, true, ['console', 'remote'])
  cache.addToStore(store)

  return appFactory.createApp(packageName, content, store, {
    input,
    actions,
    publicPath,
    textResourceModules: ['login'],
    customTheme
  })
}

export const LoginApp = props => {
  const {component} = appFactory.useApp({
    initApp: initLoginApp,
    props,
    packageName,
    externalEvents: EXTERNAL_EVENTS
  })
  return component
}

LoginApp.propTypes = {
  showTitle: PropTypes.bool,
  locale: PropTypes.string,
  passwordRequest: PropTypes.bool,
  username: PropTypes.string,
  setLocale: PropTypes.func,
  backendUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
  appContext: appContext.propTypes,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}
