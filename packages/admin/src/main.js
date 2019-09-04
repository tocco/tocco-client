import React from 'react'
import {appFactory, notifier, errorLogging, actionEmitter, externalEvents, keyDown} from 'tocco-app-extensions'
import {hot} from 'react-hot-loader/root'

import shortcuts from './shortcuts'
import reducers, {sagas} from './modules/reducers'
import LoginGuard from './components/LoginGuard'
const packageName = 'admin'

const initApp = (id, input, events, publicPath) => {
  const content = <LoginGuard/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notifier'])
  notifier.addToStore(store, true)
  keyDown.addToStore(store, shortcuts)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common', 'entity-browser', 'entity-list', 'entity-detail', packageName]
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

    const App = hot(() => app.component)
    appFactory.renderApp(<App/>)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
