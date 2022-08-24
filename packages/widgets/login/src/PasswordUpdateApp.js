import PropTypes from 'prop-types'
import {appFactory, errorLogging, externalEvents} from 'tocco-app-extensions'
import {env, appContext} from 'tocco-util'

import LoadUsernameMask from './components/LoadUsernameMask'
import * as passwordUpdate from './modules/passwordUpdate/dialog/actions'
import loginReducers, {sagas} from './modules/reducers'

const packageName = 'password-update'

const EXTERNAL_EVENTS_PASSWORD_UPDATE = ['success', 'resize']

export const initPasswordUpdateApp = (id, input, events, publicPath, customTheme) => {
  const showTitle = !!input.showTitle
  const forcedUpdate = !!input.forcedUpdate

  const content = <LoadUsernameMask showTitle={showTitle} />

  const actions = [passwordUpdate.setForcedUpdate(forcedUpdate)]
  if (typeof input.username !== 'string' || input.username.length === 0) {
    actions.push(passwordUpdate.setCurrentUsername())
  } else {
    actions.push(passwordUpdate.setUsernameOrPk(input.username))
  }

  if (typeof input.showOldPasswordField === 'boolean') {
    actions.push(passwordUpdate.setShowOldPasswordField(input.showOldPasswordField))
  }

  const store = appFactory.createStore(loginReducers, sagas, input, packageName)

  env.setInputEnvs(input)

  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS_PASSWORD_UPDATE, state.input))
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
  backendUrl: PropTypes.string,
  appContext: appContext.propTypes,
  ...EXTERNAL_EVENTS_PASSWORD_UPDATE.reduce(
    (propTypes, event) => ({
      ...propTypes,
      [event]: PropTypes.func
    }),
    {}
  )
}
