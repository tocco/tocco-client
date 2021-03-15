import React from 'react'
import PropTypes from 'prop-types'
import {reducer as reducerUtil} from 'tocco-util'
import {
  appFactory,
  actionEmitter,
  errorLogging,
  externalEvents,
  notifier
} from 'tocco-app-extensions'
import createHashHistory from 'history/createHashHistory'
import {Router as ReactRouter, Route, Redirect} from 'react-router'

import reducers, {sagas} from './modules/reducers'
import DocsBrowser from './components/DocsBrowser'

const packageName = 'docs-browser'

const textResourceSelector = (state, key) => state.intl.messages[key] || key

const createHistory = store => createHashHistory({
  getUserConfirmation: (message, confirmCallback) => {
    const state = store.getState()

    const okText = textResourceSelector(state, 'client.common.ok')
    const cancelText = textResourceSelector(state, 'client.common.cancel')

    const action = notifier.confirm(
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

const initApp = (id, input, events, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)

  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notifier'])
  notifier.addToStore(store, true)

  const history = input.history || createHistory(store)

  const content = (
    <ReactRouter history={history}>
      <notifier.Notifier/>
      <DocsBrowser history={history}/>
      <Route exact path="/">
        <Redirect to="/docs" />
      </Route>
    </ReactRouter>
  )

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common', 'actions', 'entity-list', 'entity-detail', packageName]
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

class DocsBrowserApp extends React.Component {
  constructor(props) {
    super(props)
    this.app = initApp('id', props)
  }

  render() {
    return this.app.component
  }
}

DocsBrowserApp.propTypes = {
  history: PropTypes.object,
  navigationStrategy: PropTypes.object,
  domainTypes: PropTypes.arrayOf(PropTypes.string)
}

export default DocsBrowserApp
