import PropTypes from 'prop-types'
import React from 'react'
import {appFactory, notifier, errorLogging, actionEmitter, externalEvents, storeStorage} from 'tocco-util'

import reducers, {sagas} from './modules/reducers'
import EntityListContainer from './containers/EntityListContainer'
import {getDispatchActions} from './input'
import _pickBy from 'lodash/pickBy'
import _isEqual from 'lodash/isEqual'
const packageName = 'entity-list'

const EXTERNAL_EVENTS = [
  'onRowClick',
  'onNavigateToCreate',
  'emitAction',
  'onSelectChange'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = <EntityListContainer/>

  let actions
  let store
  if (input.keepStore) {
    store = storeStorage.get(id)
  }
  if (!store) {
    store = appFactory.createStore(reducers, sagas, input, packageName)

    externalEvents.addToStore(store, events)
    actionEmitter.addToStore(store, events.emitAction)
    errorLogging.addToStore(store, false)
    notifier.addToStore(store, false)

    actions = getDispatchActions(input, true)
    storeStorage.set(id, store)
  }

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions,
      publicPath,
      textResourceModules: ['component', 'common']
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-list') {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(fetchMock)
      fetchMock.spy()
    }

    const app = initApp('id', input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        appFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class EntityListApp extends React.Component {
  constructor(props) {
    super(props)

    const events = EXTERNAL_EVENTS.reduce((events, event) => {
      if (props[event]) {
        events[event] = props[event]
      }
      return events
    }, {})

    this.app = initApp(props.id, props, events)
  }

  componentWillReceiveProps = nextProps => {
    const changedProps = _pickBy(nextProps, (value, key) => !_isEqual(value, this.props[key]))

    getDispatchActions(changedProps).forEach(action => {
      this.app.store.dispatch(action)
    })
  }

  render() {
    return (
      <div>{this.app.renderComponent()}</div>
    )
  }
}

EntityListApp.propTypes = {
  id: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  formBase: PropTypes.string.isRequired,
  keepStore: PropTypes.bool,
  limit: PropTypes.number,
  showSearchForm: PropTypes.bool,
  showCreateButton: PropTypes.bool,
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
  disableSimpleSearch: PropTypes.bool,
  simpleSearchFields: PropTypes.string,
  selectable: PropTypes.bool,
  onSelectChange: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default EntityListApp
