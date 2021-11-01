import React, {useEffect, useState} from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, cache, errorLogging, externalEvents, notification} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

import reducers, {sagas} from './modules'
import TwoFactorConnector from './components/TwoFactorConnector'

const packageName = 'two-factor-connector'

const initApp = (id, input, events, publicPath) => {
  const content = <TwoFactorConnector/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  notification.addToStore(store, true)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  externalEvents.addToStore(store, events)
  cache.addToStore(store)

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

      if (module.hot) {
        module.hot.accept('./modules/reducer', () => {
          const reducers = require('./modules/reducer').default
          reducerUtil.hotReloadReducers(app.store, reducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const EXTERNAL_EVENTS = [
  'onSuccess',
  'onCancel',
  'onResize'
]

const TwoFactorConnectorApp = props => {
  const [app, setApp] = useState(null)
  useEffect(() => {
    const events = EXTERNAL_EVENTS.reduce((events, event) => (
      {...events, ...(props[event] && {[event]: props[event]})}
    ), {})

    setApp(initApp('two-factor-connector', props, events))
  }, [])

  return app ? app.component : null
}

TwoFactorConnectorApp.propTypes = {
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => ({...propTypes, [event]: PropTypes.func}), {}),
  username: PropTypes.string,
  password: PropTypes.string,
  secret: PropTypes.shape({
    secret: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }),
  forced: PropTypes.bool
}

export default TwoFactorConnectorApp
