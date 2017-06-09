import React from 'react'

import {appFactory, notifier, errorLogging, actionEmitter, externalEvents} from 'tocco-util'
import {Router} from 'react-router'
import createHashHistory from 'history/createHashHistory'
import RouteWithSubRoutes from './components/RouteWithSubRoutes'
import {setNullBusinessUnit} from 'tocco-util/src/rest'

const packageName = 'entity-browser'

const textResourceSelector = (state, key) => state.intl.messages[key] || key

const createHistory = store => createHashHistory({
  getUserConfirmation: (message, callback) => {
    const state = store.getState()

    const okText = textResourceSelector(state, 'client.common.ok')
    const cancelText = textResourceSelector(state, 'client.common.cancel')

    const action = notifier.confirm(
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
  if (input.nullBusinessUnit) {
    setNullBusinessUnit(input.nullBusinessUnit)
  }

  const store = appFactory.createStore(undefined, undefined, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'toastr'])
  notifier.addToStore(store, true)

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
      publicPath,
      textResourceModules: ['component', 'common', 'entity-list', 'entity-detail']
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

      const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks')
      listFetchMocks(fetchMock)

      fetchMock.spy()
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
