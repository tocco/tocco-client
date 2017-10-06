import React from 'react'
import {appFactory} from 'tocco-util'

import reducers, {sagas} from './modules/reducers'

const packageName = 'resource-scheduler'

const initApp = (id, input, events, publicPath) => {
  const content = <div>Resource Scheduler</div>

  const store = appFactory.createStore(reducers, sagas, undefined)

  return appFactory.createApp(
    packageName,
    content,
    store,
    input,
    events,
    [],
    publicPath
  )
}

(() => {
  if (__DEV__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    const fetchMock = require('fetch-mock')
    const setupFetchMocks = require('./dev/fetchMocks')
    setupFetchMocks(fetchMock)

    const app = initApp('id', input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        appFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
