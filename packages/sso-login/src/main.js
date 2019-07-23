import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, externalEvents} from 'tocco-app-extensions'

import reducers, {sagas} from './modules'
import LoginBoxContainer from './containers/LoginBoxContainer'

const packageName = 'sso-login'

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
      const setupFetchMocks = require('./dev/fetchMocks')
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

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
