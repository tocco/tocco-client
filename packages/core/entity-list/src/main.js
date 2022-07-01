import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _pickBy from 'lodash/pickBy'
import PropTypes from 'prop-types'
import {
  appFactory,
  notification,
  errorLogging,
  actionEmitter,
  externalEvents,
  actions,
  formData,
  reports
} from 'tocco-app-extensions'
import SimpleFormApp from 'tocco-simple-form/src/main'
import {scrollBehaviourPropType} from 'tocco-ui'
import {react, reducer as reducerUtil, navigationStrategy} from 'tocco-util'

import EntityList from './components/EntityList'
import customActions from './customActions'
import {getDispatchActions, getReloadOption, reloadOptions} from './input'
import {reloadData, reloadAll} from './modules/entityList/actions'
import {refresh} from './modules/list/actions'
import reducers, {sagas} from './modules/reducers'
import {searchFormTypePropTypes} from './util/searchFormTypes'
import {selectionStylePropType} from './util/selectionStyles'

const packageName = 'entity-list'

const EXTERNAL_EVENTS = [
  'onRowClick',
  'emitAction',
  'onSelectChange',
  'onStoreCreate',
  'onSearchChange',
  'onSearchFormCollapsedChange'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = <EntityList />

  let store = input.store

  const allCustomActions = {
    ...customActions(input),
    ...(input.customActions || {})
  }

  const context = {
    viewName: 'list',
    formName: input.formName,
    ...(input.contextParams || {})
  }

  if (!store) {
    store = appFactory.createStore(reducers, sagas, input, packageName)

    externalEvents.addToStore(store, events)
    actionEmitter.addToStore(store, events.emitAction)
    errorLogging.addToStore(store, false)
    notification.addToStore(store, false)
    reports.addToStore(store)
    actions.addToStore(store, {
      formApp: SimpleFormApp,
      listApp: EntityListApp,
      customActions: allCustomActions,
      appComponent: input.actionAppComponent,
      navigationStrategy: input.navigationStrategy,
      context
    })
    formData.addToStore(store, {listApp: EntityListApp, navigationStrategy: input.navigationStrategy})

    store.dispatch(externalEvents.fireExternalEvent('onStoreCreate', store))
  } else {
    store.dispatch(refresh())
  }

  const app = appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: getDispatchActions(input),
    publicPath,
    textResourceModules: ['actiongroup', 'component', 'common']
  })

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const hotReducers = require('./modules/reducers').default
      reducerUtil.hotReloadReducers(app.store, hotReducers)
    })
  }

  return app
}

;(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-list') {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock').default
      fetchMock.config.overwriteRoutes = false
      const setupFetchMocks = require('./dev/fetchMocks').default
      setupFetchMocks(packageName, fetchMock)
      fetchMock.spy()
    }

    const app = initApp('id', input)
    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

const EntityListApp = props => {
  const {component, setApp, store} = appFactory.useApp({
    initApp,
    props,
    packageName: props.id,
    externalEvents: EXTERNAL_EVENTS
  })

  const prevProps = react.usePrevious(props)
  react.useDidUpdate(() => {
    const changedProps = _pickBy(props, (value, key) => !_isEqual(value, prevProps[key]))
    if (changedProps.store && typeof prevProps.store !== 'undefined') {
      /**
       * Whenever the store gets explicitly changed from outside
       * the entity-list needs to be re-initialized in order to show correct information.
       *   - e.g. docs-browser: start a search, navigate to folder and then go back to search
       * However this should not happen, whenever the entity-list has not been initialized before.
       *   - e.g. admin: loading preferences (e.g. searchFormCollapsed) and set prop to entity-list
       *                 while being in initialization phase
       *   Therefore only re-init when store has been set already.
       */
      setApp(initApp(props.id, props, appFactory.getEvents(EXTERNAL_EVENTS, props)))
    } else if (!_isEmpty(changedProps)) {
      getDispatchActions(changedProps).forEach(action => {
        store.dispatch(action)
      })

      const reloadOption = getReloadOption(changedProps)
      if (reloadOption === reloadOptions.ALL) {
        store.dispatch(reloadAll())
      } else if (reloadOption === reloadOptions.DATA) {
        store.dispatch(reloadData())
      }
    }
  }, [props])

  return component
}

EntityListApp.propTypes = {
  id: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  searchListFormName: PropTypes.string,
  store: PropTypes.object,
  limit: PropTypes.number,
  searchFormType: searchFormTypePropTypes,
  searchFormPosition: PropTypes.oneOf(['top', 'left']),
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  constriction: PropTypes.string,
  preselectedSearchFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string)
      ]),
      hidden: PropTypes.bool
    })
  ),
  tql: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  simpleSearchFields: PropTypes.string,
  onSelectChange: PropTypes.func,
  selectionStyle: selectionStylePropType,
  scrollBehaviour: scrollBehaviourPropType,
  tableMinHeight: PropTypes.string,
  selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {}),
  selectOnRowClick: PropTypes.bool,
  parent: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string
  }),
  showLink: PropTypes.bool,
  actionAppComponent: PropTypes.elementType,
  navigationStrategy: navigationStrategy.propTypes,
  contextParams: PropTypes.object,
  searchFormCollapsed: PropTypes.bool,
  modifyFormDefinition: PropTypes.func,
  reportIds: PropTypes.arrayOf(PropTypes.string)
}

export default EntityListApp
export {selectionStylePropType, searchFormTypePropTypes}
