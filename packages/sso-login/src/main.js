import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, externalEvents} from 'tocco-app-extensions'
import PropTypes from 'prop-types'
import {hot} from 'react-hot-loader/root'

import reducers, {sagas} from './modules'
import LoginBoxContainer from './containers/LoginBoxContainer'

const packageName = 'sso-login'

const EXTERNAL_EVENTS = [
  'loginCompleted'
]

const initApp = (id, input, events, publicPath) => {
  const content = <LoginBoxContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common', packageName]
    }
  )
}

(() => {
  if (__DEV__) {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks').default
      setupFetchMocks(packageName, fetchMock)
      fetchMock.spy()
    }

    const app = initApp(packageName, input)

    if (module.hot) {
      module.hot.accept('./modules/index', () => {
        const reducers = require('./modules').default
        reducerUtil.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class SsoLoginApp extends React.Component {
  constructor(props) {
    super(props)

    const events = EXTERNAL_EVENTS.reduce((events, event) => {
      if (props[event]) {
        events[event] = props[event]
      }
      return events
    }, {})

    this.app = initApp('id', props, events)
  }

  render() {
    return this.app.component
  }
}

SsoLoginApp.propTypes = {
  ssoLoginEndpoint: PropTypes.string.isRequired,
  locale: PropTypes.string,
  autoLogin: PropTypes.bool
}

export default hot(SsoLoginApp)
