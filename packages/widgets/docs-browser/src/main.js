import createHashHistory from 'history/createHashHistory'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _pickBy from 'lodash/pickBy'
import PropTypes from 'prop-types'
import {actionEmitter, appFactory, cache, errorLogging, externalEvents, notification} from 'tocco-app-extensions'
import {searchFormTypePropTypes, selectionStylePropType} from 'tocco-entity-list/src/main'
import {scrollBehaviourPropType} from 'tocco-ui'
import {appContext, react, reducer as reducerUtil, env} from 'tocco-util'

import {InheritedApp, RouterlessApp, StandaloneApp} from './components/App'
import {getDispatchActions} from './input'
import chooseDocument from './modules/chooseDocument'
import reducers, {sagas} from './modules/reducers'
import {navigate} from './modules/routing/actions'

const packageName = 'docs-browser'

const EXTERNAL_EVENTS = ['onListParentChange', 'openResource', 'onSelectChange', 'onSearchFormCollapsedChange']

const textResourceSelector = (state, key) => state.intl.messages[key] || key

const createHistory = store => {
  return createHashHistory({
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

const getContent = ({routerType, store, rootPath, handleNotifications}) => {
  if (routerType === 'routerless') {
    return <RouterlessApp rootPath={rootPath} handleNotifications={handleNotifications} />
  }

  if (routerType === 'inherit') {
    return <InheritedApp rootPath={rootPath} handleNotifications={handleNotifications} />
  }

  // only create new histroy object for standalone docs-browser (e.g. Widget)
  const history = createHistory(store)
  return <StandaloneApp history={history} rootPath={rootPath} handleNotifications={handleNotifications} />
}

const initApp = (id, input, events = {}, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)

  env.setInputEnvs(input)

  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  const handleNotifications = !events.emitAction
  notification.addToStore(store, handleNotifications)
  cache.addToStore(store)

  const singleRootNode =
    Array.isArray(input.rootNodes) && input.rootNodes.length === 1 && input.rootNodes[0].entityName !== 'Resource'
      ? input.rootNodes[0]
      : null

  const rootPath = singleRootNode
    ? `/docs/${singleRootNode.entityName.toLowerCase()}/${singleRootNode.key}/list`
    : '/docs'

  const content = getContent({
    routerType: input.routerType,
    store,
    rootPath,
    handleNotifications
  })

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [...getDispatchActions(input), navigate(input.initialLocation)],
    publicPath,
    textResourceModules: ['component', 'common', 'actions', 'entity-list', 'entity-detail', packageName]
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
        module.hot.accept('./modules/reducers', () => {
          const reducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, reducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const DocsBrowserApp = props => {
  const {component, store} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})

  const prevProps = react.usePrevious(props)
  react.useDidUpdate(() => {
    const changedProps = _pickBy(props, (value, key) => !_isEqual(value, prevProps[key]))
    if (!_isEmpty(changedProps)) {
      getDispatchActions(changedProps).forEach(action => {
        store.dispatch(action)
      })
    }
  }, [props])

  return component
}

DocsBrowserApp.propTypes = {
  routerType: PropTypes.oneOf(['standalone', 'inherit', 'routerless']),
  navigationStrategy: PropTypes.object,
  domainTypes: PropTypes.arrayOf(PropTypes.string),
  rootNodes: PropTypes.arrayOf(
    PropTypes.shape({
      entityName: PropTypes.string,
      key: PropTypes.string
    })
  ),
  initialLocation: PropTypes.string,
  listLimit: PropTypes.number,
  documentDetailFormName: PropTypes.string,
  searchFormType: searchFormTypePropTypes,
  selectionStyle: selectionStylePropType,
  scrollBehaviour: scrollBehaviourPropType,
  getListFormName: PropTypes.func,
  disableViewPersistor: PropTypes.bool,
  getCustomLocation: PropTypes.func,
  businessUnit: PropTypes.string,
  searchFormCollapsed: PropTypes.bool,
  backendUrl: PropTypes.string,
  appContext: appContext.propTypes,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default DocsBrowserApp
export {chooseDocument}
export const app = appFactory.createBundleableApp(packageName, initApp)
