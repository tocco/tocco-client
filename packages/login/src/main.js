import React from 'react'
import {appFactory, storeFactory, consoleLogger} from 'tocco-util'

import * as passwordUpdate from './modules/passwordUpdate/dialog/actions'
import LoginContainer from './containers/LoginContainer'
import PasswordUpdateDialog from './containers/PasswordUpdateDialogContainer'
import loginReducers, {sagas} from './modules/reducers'

const packageName = 'login'

const initLoginApp = (id, input, events, publicPath) => {
  const dispatchActions = [
    passwordUpdate.setShowOldPasswordField(false),
    passwordUpdate.setForcedUpdate(true),
    passwordUpdate.setStandalone(false)
  ]

  const showTitle = !!input.showTitle
  const content = <LoginContainer showTitle={showTitle}/>

  return appFactory.createApp(
    packageName,
    content,
    loginReducers,
    sagas,
    input,
    events,
    dispatchActions,
    publicPath
  )
}

const initPasswordUpdateApp = (id, input, events, publicPath) => {
  const showTitle = !!input.showTitle
  const forcedUpdate = !!input.forcedUpdate

  const content = <PasswordUpdateDialog showTitle={showTitle}/>

  if (typeof input.username !== 'string' || input.username.length === 0) {
    consoleLogger.logError('Mandatory input "username" is not set on password-update')
    return
  }

  const dispatchActions = [
    passwordUpdate.setUsername(input.username),
    passwordUpdate.setForcedUpdate(forcedUpdate)

  ]

  if (typeof input.showOldPasswordField === 'boolean') {
    dispatchActions.push(passwordUpdate.setShowOldPasswordField(input.showOldPasswordField))
  }

  return appFactory.createApp(
    `${packageName}.passwordUpdate`,
    content,
    {passwordUpdate: loginReducers.passwordUpdate},
    sagas,
    input,
    events,
    dispatchActions,
    publicPath
  )
}

(() => {
  if (__DEV__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')

    const fetchMock = require('fetch-mock')
    const setupFetchMocks = require('./dev/fetchMocks')
    setupFetchMocks(fetchMock)

    // const app = initLoginApp('id', require('./dev/login_input.json'))
    // uncomment to develop passwordUpdate App
    const app = initPasswordUpdateApp('id', require('./dev/password_update_input.json'))

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        storeFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    storeFactory.registerAppInRegistry(packageName, initLoginApp)
    storeFactory.registerAppInRegistry('password-update', initPasswordUpdateApp)
  }
})()
