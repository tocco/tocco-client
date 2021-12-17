import React from 'react'
import PropTypes from 'prop-types'
import {reducer as reducerUtil} from 'tocco-util'
import {actionEmitter, appFactory, cache, errorLogging, externalEvents, notification, rest} from 'tocco-app-extensions'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/util/searchFormTypes'
import {selectionStylePropType} from 'tocco-entity-list/src/util/selectionStyles'
import createHashHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import {Redirect, Route, Router as ReactRouter} from 'react-router'
import {GlobalStyles} from 'tocco-ui'
import _pickBy from 'lodash/pickBy'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'

import reducers, {sagas} from './modules/reducers'
import DocsBrowser from './components/DocsBrowser'
import {getDispatchActions} from './input'

const packageName = 'docs-browser'

const EXTERNAL_EVENTS = [
  'onListParentChange',
  'openResource',
  'onSelectChange',
  'onSearchFormCollapsedChange'
]

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
const initApp = (id, input, events = {}, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)

  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  const handleNotifications = !events.emitAction
  notification.addToStore(store, handleNotifications)
  cache.addToStore(store)

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
      {handleNotifications && <notification.Notifications/>}
      <GlobalStyles/>
      <DocsBrowser history={history}/>
      <Route exact path="/">
        <Redirect to={startUrl}/>
      </Route>
  {
    singleRootNode && (
      <Route exact path="/docs">
        <Redirect to={startUrl}/>
      </Route>
    )
  }
    </ReactRouter>
  )

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: getDispatchActions(input),
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

const getEvents = props =>
  EXTERNAL_EVENTS.reduce((events, event) => {
    if (props[event]) {
      events[event] = props[event]
    }
    return events
  }, {})

class DocsBrowserApp extends React.Component {
  constructor(props) {
    super(props)

    this.app = initApp('docs-browser', props, getEvents(props))
  }

  componentDidUpdate(prevProps) {
    const changedProps = _pickBy(this.props, (value, key) => !_isEqual(value, prevProps[key]))
    if (!_isEmpty(changedProps)) {
      getDispatchActions(changedProps).forEach(action => {
        this.app.store.dispatch(action)
      })
    }
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
  searchFormCollapsed: PropTypes.bool,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default DocsBrowserApp