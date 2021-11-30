import React from 'react'
import {consoleLogger, reducer as reducerUtil} from 'tocco-util'
import {appFactory, cache, errorLogging, externalEvents} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

import * as passwordUpdate from './modules/passwordUpdate/dialog/actions'
import * as passwordRequest from './modules/passwordRequest/actions'
import * as login from './modules/login/actions'
import LoginContainer from './containers/LoginContainer'
import loginReducers, {sagas} from './modules/reducers'

const packageName = 'login'

const EXTERNAL_EVENTS = [
  'loginSuccess',
  'resize'
]

const initLoginApp = (id, input, events, publicPath, customTheme) => {
  const actions = [
    passwordUpdate.setShowOldPasswordField(false),
    passwordUpdate.setStandalone(false),
    passwordRequest.setPasswordRequest(!!input.passwordRequest),
    login.setUsername(input.username || '')
  ]

  const showTitle = !!input.showTitle
  const content = <LoginContainer showTitle={showTitle}/>

  const store = appFactory.createStore(loginReducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  errorLogging.addToStore(store, true, ['console', 'remote'])
  cache.addToStore(store)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      actions,
      publicPath,
      textResourceModules: ['login'],
      customTheme
    }
  )
}

const initPasswordUpdateApp = (id, input, events, publicPath, customTheme) => {
  const showTitle = !!input.showTitle
  const forcedUpdate = !!input.forcedUpdate

  const content = <LoginContainer currentPage="PASSWORD_UPDATE" showTitle={showTitle}/>

  if (typeof input.username !== 'string' || input.username.length === 0) {
    consoleLogger.logError('Mandatory input "username" is not set on password-update')
    return
  }

  const actions = [
    passwordUpdate.setUsernameOrPk(input.username),
    passwordUpdate.setForcedUpdate(forcedUpdate)
  ]

  if (typeof input.showOldPasswordField === 'boolean') {
    actions.push(passwordUpdate.setShowOldPasswordField(input.showOldPasswordField))
  }

  const store = appFactory.createStore(loginReducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  errorLogging.addToStore(store, true, ['console', 'remote'])

  return appFactory.createApp(
    `${packageName}.passwordUpdate`,
    content,
    store,
    {
      input,
      actions,
      publicPath,
      textResourceModules: ['login'],
      customTheme
    }
  )
}

(() => {
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
      // uncomment to develop passwordUpdate App
      // const app = initPasswordUpdateApp('id', require('./dev/password_update_input.json'))

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

const LoginApp = props => {
  const {component} = appFactory.useApp({
    initApp: initLoginApp,
    props,
    packageName: 'id',
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
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default LoginApp

const EXTERNAL_EVENTS_PASSWORD_UPDATE = [
  'success',
  'resize'
]

export const PasswordUpdateApp = props => {
  const {component} = appFactory.useApp({
    initApp: initPasswordUpdateApp,
    props,
    packageName: 'password-update',
    externalEvents: EXTERNAL_EVENTS_PASSWORD_UPDATE
  })
  return component
}

PasswordUpdateApp.propTypes = {
  username: PropTypes.string,
  showTitle: PropTypes.bool,
  showOldPasswordField: PropTypes.bool,
  oldPassword: PropTypes.string,
  ...EXTERNAL_EVENTS_PASSWORD_UPDATE.reduce((propTypes, event) => ({...propTypes, [event]: PropTypes.func}), {})
}
