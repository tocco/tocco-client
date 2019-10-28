import React from 'react'
import {appFactory} from 'tocco-app-extensions'

import InstallationDelta from './components/InstallationDelta'

const packageName = 'installation-delta-action'

const initApp = (id, input, events, publicPath) => {
  const content = <InstallationDelta/>

  const store = appFactory.createStore({}, null, input, packageName)

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

    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
