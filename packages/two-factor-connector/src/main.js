import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, errorLogging, notifier} from 'tocco-app-extensions'

import reducers, {sagas} from './modules'
import TwoFactorConnector from './components/TwoFactorConnector'

const packageName = 'two-factor-connector'

const initApp = (id, input, events, publicPath) => {
  const content = <TwoFactorConnector/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  notifier.addToStore(store, true)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notifier'])

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
  if (__DEV__ && __PACKAGE_NAME__ === packageName) {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
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
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
