import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory} from 'tocco-app-extensions'

import reducers, {sagas} from './modules/reducers'

const packageName = 'dashboard'

const initApp = (id, input, events, publicPath) => {
  const content = <div>Dashboard</div>

  const store = appFactory.createStore(reducers, sagas, input, packageName)

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
        module.hot.accept('./modules/reducers', () => {
          const reducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, reducers)
        })
      }
  
      appFactory.renderApp(app.component)
    }
  }
})()
