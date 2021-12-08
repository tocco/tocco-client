import PropTypes from 'prop-types'
import React from 'react'
import {appFactory, errorLogging, externalEvents} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import LoginContainer from './containers/LoginContainer'
import * as passwordUpdate from './modules/passwordUpdate/dialog/actions'
import loginReducers, {sagas} from './modules/reducers'

const packageName = 'password-update'

const EXTERNAL_EVENTS_PASSWORD_UPDATE = ['success', 'resize']

export const initPasswordUpdateApp = (id, input, events, publicPath, customTheme) => {
  const showTitle = !!input.showTitle
  const forcedUpdate = !!input.forcedUpdate

  const content = <LoginContainer currentPage="PASSWORD_UPDATE" showTitle={showTitle} />

  if (typeof input.username !== 'string' || input.username.length === 0) {
    consoleLogger.logError('Mandatory input "username" is not set on password-update')
    return
  }

  const actions = [passwordUpdate.setUsernameOrPk(input.username), passwordUpdate.setForcedUpdate(forcedUpdate)]

  if (typeof input.showOldPasswordField === 'boolean') {
    actions.push(passwordUpdate.setShowOldPasswordField(input.showOldPasswordField))
  }

  const store = appFactory.createStore(loginReducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  errorLogging.addToStore(store, true, ['console', 'remote'])

  return appFactory.createApp(packageName, content, store, {
    input,
    actions,
    publicPath,
    textResourceModules: ['login'],
    customTheme
  })
}

export const PasswordUpdateApp = props => {
  const {component} = appFactory.useApp({
    initApp: initPasswordUpdateApp,
    props,
    packageName,
    externalEvents: EXTERNAL_EVENTS_PASSWORD_UPDATE
  })
  return component
}

PasswordUpdateApp.propTypes = {
  username: PropTypes.string,
  showTitle: PropTypes.bool,
  showOldPasswordField: PropTypes.bool,
  oldPassword: PropTypes.string,
  ...EXTERNAL_EVENTS_PASSWORD_UPDATE.reduce(
    (propTypes, event) => ({
      ...propTypes,
      [event]: PropTypes.func
    }),
    {}
  )
}
