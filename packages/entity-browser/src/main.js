import React from 'react'

import {appFactory} from 'tocco-util'
import {Router} from 'react-router'
import createHashHistory from 'history/createHashHistory'
import RouteWithSubRoutes from './components/RouteWithSubRoutes'
import {createConfirmationAction} from './util/notification'

const packageName = 'entity-browser'

const textResourceSelector = (state, key) => state.intl.messages[key] || key

const createHistory = store => createHashHistory({
  getUserConfirmation: (message, callback) => {
    const state = store.getState()

    const okText = textResourceSelector(state, 'client.common.ok')
    const cancelText = textResourceSelector(state, 'client.common.cancel')

    const action = createConfirmationAction(
      message,
      okText,
      cancelText,
      () => callback(true), // eslint-disable-line standard/no-callback-literal
      () => callback(false) // eslint-disable-line standard/no-callback-literal
    )
    store.dispatch(action)
  }
})

const navigateToDetailIfKeySet = (history, input) => {
  const initialDetailViewKey = input.initialKey
  if (initialDetailViewKey && !isNaN(initialDetailViewKey)) {
    const regex = /\/detail\/[0-9]*/
    if (!history.location.pathname.match(regex)) {
      const path = `/detail/${input.initialKey}`
      history.push(path)
    }
  }

  return history
}

const initApp = (id, input, events, publicPath) => {
  const store = appFactory.createStore(undefined, undefined, input, packageName)

  const history = createHistory(store)
  navigateToDetailIfKeySet(history, input)

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
    {
      input,
      events,
      publicPath,
      textResourceModules: ['component', 'common', 'entity-list']
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-browser') {
    require('tocco-theme/src/ToccoTheme/theme.scss')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(fetchMock)
    }

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
