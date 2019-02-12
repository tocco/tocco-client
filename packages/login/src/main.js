import React from 'react'
import {consoleLogger, reducer as reducerUtil} from 'tocco-util'
import {appFactory, errorLogging, externalEvents} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

import * as passwordUpdate from './modules/passwordUpdate/dialog/actions'
import * as passwordRequest from './modules/passwordRequest/actions'
import * as login from './modules/login/actions'
import LoginContainer from './containers/LoginContainer'
import PasswordUpdateDialog from './containers/PasswordUpdateDialogContainer'
import loginReducers, {sagas} from './modules/reducers'

const packageName = 'login'

const EXTERNAL_EVENTS = [
  'loginSuccess',
  'resize'
]

const initLoginApp = (id, input, events, publicPath, customTheme) => {
  const actions = [
    passwordUpdate.setShowOldPasswordField(false),
    passwordUpdate.setForcedUpdate(true),
    passwordUpdate.setStandalone(false),
    passwordRequest.setPasswordRequest(input.passwordRequest),
    login.setUsername(input.username)
  ]

  const showTitle = !!input.showTitle
  const content = <LoginContainer showTitle={showTitle}/>

  const store = appFactory.createStore(loginReducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  errorLogging.addToStore(store, true, ['console', 'remote'])

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

  const content = <PasswordUpdateDialog showTitle={showTitle}/>

  if (typeof input.username !== 'string' || input.username.length === 0) {
    consoleLogger.logError('Mandatory input "username" is not set on password-update')
    return
  }

  const actions = [
    passwordUpdate.setUsername(input.username),
    passwordUpdate.setForcedUpdate(forcedUpdate)
  ]

  if (typeof input.showOldPasswordField === 'boolean') {
    actions.push(passwordUpdate.setShowOldPasswordField(input.showOldPasswordField))
  }

  const reducers = {
    passwordUpdate: loginReducers.passwordUpdate
  }

  const store = appFactory.createStore(reducers, sagas, input, packageName)
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
  if (__DEV__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')
  }

  if (__DEV__) {
    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
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

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initLoginApp)
    appFactory.registerAppInRegistry('password-update', initPasswordUpdateApp)
  }
})()

class LoginApp extends React.Component {
  constructor(props) {
    super(props)

    const events = EXTERNAL_EVENTS.reduce((events, event) => {
      if (props[event]) {
        events[event] = props[event]
      }
      return events
    }, {})

    this.input = {
      locale: 'de'
    }

    this.app = initLoginApp('id', require('./dev/login_input.json'), events)
  }

  render() {
    return (
      <div>{this.app.renderComponent()}</div>
    )
  }
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
