import createHashHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import PropTypes from 'prop-types'
import React from 'react'
import {actionEmitter, appFactory, cache, errorLogging, externalEvents, login, notification} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'
import {route, env} from 'tocco-util'

import {sagas} from './modules/reducers'

const packageName = 'entity-browser'

const textResourceSelector = (state, key) => state.intl.messages[key] || key

const createHistory = (store, memoryHistory) => {
  const historyFactory = memoryHistory ? createMemoryHistory : createHashHistory

  return historyFactory({
    getUserConfirmation: (message, confirmCallback) => {
      const state = store.getState()

      const okText = textResourceSelector(state, 'client.common.ok')
      const cancelText = textResourceSelector(state, 'client.common.cancel')

      const action = notification.confirm(
        '',
        message,
        okText,
        cancelText,
        () => confirmCallback(true),
        () => confirmCallback(false)
      )
      store.dispatch(action)
    }
  })
}

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
  input = {...input, id}

  if (input.backendUrl) {
    env.setBackendUrl(input.backendUrl)
  }

  if (input.nullBusinessUnit) {
    env.setBusinessUnit(env.NULL_BUSINESS_UNIT)
  } else if (input.runInBusinessUnit) {
    env.setBusinessUnit(input.runInBusinessUnit)
  }

  const store = appFactory.createStore(undefined, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  notification.addToStore(store, true)
  login.addToStore(store)
  cache.addToStore(store)

  const history = createHistory(store, input.memoryHistory)
  navigateToDetailIfKeySet(history, input)

  const routes = require('./routes/index').default(store, input)

  const content = (
    <>
      <GlobalStyles />
      <route.Router history={history} routes={routes} />
    </>
  )

  const app = appFactory.createApp(packageName, content, store, {
    input,
    actions: [],
    publicPath,
    textResourceModules: ['component', 'common', 'actions', 'entity-list', 'entity-detail']
  })

  if (module.hot) {
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        appFactory.reloadApp(app.renderComponent())
      })
    )
  }

  return app
}

;(() => {
  if (__PACKAGE_NAME__ === 'entity-browser') {
    appFactory.registerAppInRegistry(packageName, initApp)

    if (__DEV__) {
      if (!__NO_MOCK__) {
        const fetchMock = require('fetch-mock').default
        fetchMock.config.overwriteRoutes = false

        const setupFetchMocks = require('./dev/fetchMocks').default
        setupFetchMocks(packageName, fetchMock)

        fetchMock.spy()
      }

      const input = !__NO_MOCK__ ? require('./dev/input.json') : require('./dev/input-no-mock.json')

      const app = initApp('id', input)
      appFactory.renderApp(app.component)
    }
  }
})()

const EntityBrowserApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

EntityBrowserApp.propTypes = {
  entityName: PropTypes.string.isRequired,
  showSearchForm: PropTypes.bool,
  disableSimpleSearch: PropTypes.bool,
  formBase: PropTypes.string,
  limit: PropTypes.number,
  preselectedSearchFields: PropTypes.array,
  searchFilters: PropTypes.array,
  simpleSearchFields: PropTypes.string,
  initialKey: PropTypes.string,
  nullBusinessUnit: PropTypes.bool,
  runInBusinessUnit: PropTypes.string,
  memoryHistory: PropTypes.bool,
  backendUrl: PropTypes.string
}

export default EntityBrowserApp
