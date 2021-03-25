import React from 'react'
import PropTypes from 'prop-types'
import {reducer as reducerUtil} from 'tocco-util'
import {
  appFactory,
  actionEmitter,
  errorLogging,
  externalEvents,
  notification
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

const initApp = (id, input, events, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)

  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  notification.addToStore(store, true)

  const history = input.history || createHistory(store)

  const singleRootNode = Array.isArray(input.rootNodes) && input.rootNodes.length === 1 ? input.rootNodes[0] : null
  const startUrl = singleRootNode
    ? `/docs/${singleRootNode.entityName.toLowerCase()}/${singleRootNode.key}/list`
    : '/docs'

  const content = (
    <ReactRouter history={history}>
      <notification.Notifications/>
      <DocsBrowser history={history}/>
      <Route exact path="/">
        <Redirect to={startUrl} />
      </Route>
      {singleRootNode && (
        <Route exact path="/docs">
          <Redirect to={startUrl} />
        </Route>
      )}
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
  domainTypes: PropTypes.arrayOf(PropTypes.string),
  rootNodes: PropTypes.arrayOf(PropTypes.shape({
    entityName: PropTypes.string,
    key: PropTypes.string
  }))
}

export default DocsBrowserApp
