import createHashHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _pickBy from 'lodash/pickBy'
import PropTypes from 'prop-types'
import React, {Suspense} from 'react'
import {Router} from 'react-router-dom'
import {
  actionEmitter,
  appFactory,
  actions,
  cache,
  errorLogging,
  externalEvents,
  login,
  notification
} from 'tocco-app-extensions'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {GlobalStyles} from 'tocco-ui'
import {appContext, env, react, reducer as reducerUtil} from 'tocco-util'

import {getDispatchActions} from './input'
import reducers, {sagas} from './modules/reducers'

const packageName = 'entity-browser'

const EXTERNAL_EVENTS = ['onStateChange']

const LazyEntityBrowserComp = React.lazy(() => import('./components/EntityBrowser'))
const LazyEntityBrowser = () => (
  <Suspense fallback="">
    <LazyEntityBrowserComp />
  </Suspense>
)

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

  env.setInputEnvs(input)

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))
  actionEmitter.addToStore(store)
  actions.dynamicActionsAddToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  notification.addToStore(store, true)
  login.addToStore(store)
  cache.addToStore(store)

  const history = createHistory(store, input.memoryHistory)
  navigateToDetailIfKeySet(history, input)

  const content = (
    <Router history={history}>
      <GlobalStyles />
      <LazyEntityBrowser />
    </Router>
  )

  return appFactory.createApp(packageName, content, store, {
    input,
    actions: getDispatchActions(input),
    publicPath,
    textResourceModules: ['component', 'common', 'actions', 'entity-list', 'entity-detail']
  })
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

      const app = initApp(packageName, input)

      if (module.hot) {
        module.hot.accept('./modules/reducers', () => {
          const hotReducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, hotReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const EntityBrowserApp = props => {
  const {component, store} = appFactory.useApp({initApp, props, packageName})

  const prevProps = react.usePrevious(props)
  react.useDidUpdate(() => {
    const changedProps = _pickBy(props, (value, key) => !_isEqual(value, prevProps[key]))
    if (!_isEmpty(changedProps)) {
      getDispatchActions(changedProps, false).forEach(action => {
        store.dispatch(action)
      })
    }
  }, [props])

  return component
}

EntityBrowserApp.propTypes = {
  entityName: PropTypes.string.isRequired,
  searchFormType: searchFormTypePropTypes, // except for `admin` (not allowed because of layouting issues)
  formBase: PropTypes.string,
  limit: PropTypes.number,
  preselectedSearchFields: PropTypes.array,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  simpleSearchFields: PropTypes.string,
  initialKey: PropTypes.string,
  businessUnit: PropTypes.string,
  memoryHistory: PropTypes.bool,
  backendUrl: PropTypes.string,
  scrollBehaviour: PropTypes.string,
  appContext: appContext.propTypes,
  modifyFormDefinition: PropTypes.func,
  disableDetailView: PropTypes.bool,
  reportIds: PropTypes.arrayOf(PropTypes.string),
  ...externalEvents.createPropTypes(EXTERNAL_EVENTS)
}

export default EntityBrowserApp
export const app = appFactory.createBundleableApp(packageName, initApp, EntityBrowserApp)
