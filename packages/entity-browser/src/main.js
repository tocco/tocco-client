import React from 'react'

import {appFactory} from 'tocco-util'
import {Router} from 'react-router'
import createHistory from 'history/createHashHistory'
import RouteWithSubRoutes from './components/RouteWithSubRoutes'

const packageName = 'entity-browser'

const initApp = (id, input, events, publicPath) => {
  const history = createHistory()

  const store = appFactory.createStore(undefined, undefined, input)

  const routes = require('./routes/index').default(store, input)

  const content = (
    <Router history={history}>
      <div>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    </Router>
  )

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

    const fetchMock = require('fetch-mock')
    const setupFetchMocks = require('./dev/fetchMocks')
    setupFetchMocks(fetchMock)

    const input = require('./dev/input.json')

    const app = initApp('id', input)

    if (module.hot) {
      module.hot.accept('./routes/index', () =>
        setImmediate(() => {
          appFactory.reloadApp(app.renderComponent())
        })
      )
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

