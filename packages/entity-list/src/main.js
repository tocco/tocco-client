import PropTypes from 'prop-types'
import React from 'react'
import {storeStorage} from 'tocco-util'
import {
  appFactory,
  notifier,
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
import EntityListContainer from './containers/EntityListContainer'
import {getDispatchActions} from './input'
import {selectionStylePropType} from './util/selectionStyles'
import customActions from './customActions'

const packageName = 'entity-list'

const EXTERNAL_EVENTS = [
  'onRowClick',
  'onNavigateToCreate',
  'emitAction',
  'onSelectChange'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = <EntityListContainer/>

  let dispatchActions
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
    actions.addToStore(store, {formApp: SimpleFormApp, listApp: EntityListApp, customActions})
    formData.addToStore(store, {listApp: EntityListApp, linkFactory: input.linkFactory})

    dispatchActions = getDispatchActions(input, true)
    storeStorage.set(id, store)
  }

  const app = appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: dispatchActions,
      publicPath,
      textResourceModules: ['component', 'common']
    }
  )

  return app
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-list') {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(packageName, fetchMock)
      fetchMock.spy()
    }

    const app = initApp('id', input)
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

  componentDidUpdate(prevProps) {
    const changedProps = _pickBy(this.props, (value, key) => !_isEqual(value, prevProps[key]))
    if (!_isEmpty(changedProps)) {
      getDispatchActions(changedProps).forEach(action => {
        this.app.store.dispatch(action)
      })
    }
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
  })
}

export default EntityListApp
