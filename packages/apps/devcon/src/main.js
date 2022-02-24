import {createBrowserHistory} from 'history'
import React, {Suspense} from 'react'
import {errorLogging, appFactory, notification} from 'tocco-app-extensions'
import {route, reducer as reducerUtil} from 'tocco-util'

import reducers, {sagas} from './modules'

const packageName = 'devcon'

const LazyDevConComp = React.lazy(() => import('./components/devcon'))
const LazyDevCon = () => (
  <div>
    <Suspense fallback="">
      <LazyDevConComp />
    </Suspense>
  </div>
)

const initApp = (id, input, events, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  notification.addToStore(store, true)

  const history = createBrowserHistory()

  const content = (
    <route.CustomRouter history={history} basename={input.baseRoute}>
      <LazyDevCon />
    </route.CustomRouter>
  )

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
    publicPath,
    textResourceModules: ['component', 'common', packageName]
  })
}

;(() => {
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
        module.hot.accept('./modules', () => {
          const hotReloadedReducers = require('./modules').default
          reducerUtil.hotReloadReducers(app.store, hotReloadedReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()
