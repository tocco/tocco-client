import React from 'react'
import PropTypes from 'prop-types'
import {reducer as reducerUtil} from 'tocco-util'
import {
  appFactory,
  actionEmitter,
  errorLogging,
  externalEvents,
  notifier,
  rest
} from 'tocco-app-extensions'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/util/searchFormTypes'
import {selectionStylePropType} from 'tocco-entity-list/src/util/selectionStyles'
import createHashHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import {Router as ReactRouter, Route, Redirect} from 'react-router'

import DocsBrowser from './components/DocsBrowser'
import reducers, {sagas} from './modules/reducers'

const packageName = 'docs-browser'

const EXTERNAL_EVENTS = [
  'onListParentChange',
  'openResource'
]

const textResourceSelector = (state, key) => state.intl.messages[key] || key

const createHistory = (store, memoryHistory) => {
  const historyFactory = memoryHistory ? createMemoryHistory : createHashHistory

  return historyFactory({
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
}

const initApp = (id, input, events = {}, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)

  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notifier'])
  const handleNotifications = !events.emitAction
  notifier.addToStore(store, handleNotifications)

  if (input.businessUnit) {
    rest.setBusinessUnit(input.businessUnit)
  }

  const history = input.history || createHistory(store, input.memoryHistory)

  if (input.initialLocation) {
    history.push(input.initialLocation)
  }

  const singleRootNode = Array.isArray(input.rootNodes) && input.rootNodes.length === 1
    && input.rootNodes[0].entityName !== 'Resource'
    ? input.rootNodes[0]
    : null

  const startUrl = singleRootNode
    ? `/docs/${singleRootNode.entityName.toLowerCase()}/${singleRootNode.key}/list`
    : '/docs'

  const content = (
    <ReactRouter history={history}>
      {handleNotifications && <notifier.Notifier />}
      <DocsBrowser history={history} />
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

    const events = EXTERNAL_EVENTS.reduce((events, event) => {
      if (props[event]) {
        events[event] = props[event]
      }
      return events
    }, {})

    this.app = initApp('docs-browser', props, events)
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
  })),
  initialLocation: PropTypes.string,
  listLimit: PropTypes.number,
  documentDetailFormName: PropTypes.string,
  searchFormType: searchFormTypePropTypes,
  selectionStyle: selectionStylePropType,
  getListFormName: PropTypes.func,
  memoryHistory: PropTypes.bool,
  disableViewPersistor: PropTypes.bool,
  getCustomLocation: PropTypes.func,
  businessUnit: PropTypes.string,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default DocsBrowserApp
