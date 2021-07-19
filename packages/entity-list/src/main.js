import PropTypes from 'prop-types'
import React from 'react'
import {reducer as reducerUtil, navigationStrategy} from 'tocco-util'
import {
  appFactory,
  notification,
  errorLogging,
  actionEmitter,
  externalEvents,
  actions,
  formData
} from 'tocco-app-extensions'
import _pickBy from 'lodash/pickBy'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import SimpleFormApp from 'tocco-simple-form/src/main'

import reducers, {sagas} from './modules/reducers'
import {reloadData, reloadAll} from './modules/entityList/actions'
import EntityList from './components/EntityList'
import {getDispatchActions, getReloadOption, reloadOptions} from './input'
import {selectionStylePropType} from './util/selectionStyles'
import customActions from './customActions'
import {searchFormTypePropTypes} from './util/searchFormTypes'

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
  const content = <EntityList/>

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
  }

  const app = appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: getDispatchActions(input),
      publicPath,
      textResourceModules: ['component', 'common']
    }
  )

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const reducers = require('./modules/reducers').default
      reducerUtil.hotReloadReducers(app.store, reducers)
    })
  }

  return app
}

(() => {
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

const getEvents = props =>
  EXTERNAL_EVENTS.reduce((events, event) => {
    if (props[event]) {
      events[event] = props[event]
    }
    return events
  }, {})

class EntityListApp extends React.Component {
  constructor(props) {
    super(props)
    this.app = initApp(props.id, props, getEvents(props))
  }

  componentDidUpdate(prevProps) {
    const changedProps = _pickBy(this.props, (value, key) => !_isEqual(value, prevProps[key]))
    if (changedProps.store) {
      this.app = initApp(this.props.id, this.props, getEvents(this.props))
    } else if (!_isEmpty(changedProps)) {
      getDispatchActions(changedProps).forEach(action => {
        this.app.store.dispatch(action)
      })

      const reloadOption = getReloadOption(changedProps)
      if (reloadOption === reloadOptions.ALL) {
        this.app.store.dispatch(reloadAll())
      } else if (reloadOption === reloadOptions.DATA) {
        this.app.store.dispatch(reloadData())
      }
    }
  }

  render() {
    return this.app.component
  }
}

EntityListApp.propTypes = {
  id: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  store: PropTypes.object,
  limit: PropTypes.number,
  searchFormType: searchFormTypePropTypes,
  searchFormPosition: PropTypes.oneOf(['top', 'left']),
  searchFilters: PropTypes.arrayOf(PropTypes.string),
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
  disableSimpleSearch: PropTypes.bool,
  simpleSearchFields: PropTypes.string,
  onSelectChange: PropTypes.func,
  selectionStyle: selectionStylePropType,
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
  actionAppComponent: PropTypes.func,
  navigationStrategy: navigationStrategy.propTypes,
  contextParams: PropTypes.object
}

export default EntityListApp
