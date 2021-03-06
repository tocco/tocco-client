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
  formData,
  keyDown
} from 'tocco-app-extensions'
import SimpleFormApp from 'tocco-simple-form/src/main'
import EntityListApp from 'tocco-entity-list/src/main'

import reducers, {sagas} from './modules/reducers'
import DetailViewContainer from './containers/DetailViewContainer'
import {getDispatchActions} from './input'
import customActions from './customActions'
import shortcuts from './shortcuts'

const packageName = 'entity-detail'

const EXTERNAL_EVENTS = [
  'onSubGridRowClick',
  'onEntityCreated',
  'onEntityUpdated',
  'onEntityDeleted',
  'onTouchedChange',
  'emitAction'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = <DetailViewContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store, events.emitAction)
  errorLogging.addToStore(store, false)
  notification.addToStore(store, false)
  actions.addToStore(store,
    {
      formApp: SimpleFormApp,
      listApp: EntityListApp,
      customActions,
      appComponent: input.actionAppComponent,
      navigationStrategy: input.navigationStrategy,
      context: {
        viewName: 'detail',
        formName: input.formName
      }
    }
  )
  formData.addToStore(store, {listApp: EntityListApp, navigationStrategy: input.navigationStrategy})
  keyDown.addToStore(store, shortcuts)

  const dispatchActions = getDispatchActions(input)

  const app = appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: dispatchActions,
      publicPath,
      textResourceModules: ['component', 'common', 'entity-list']
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
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-detail') {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock').default
      fetchMock.config.overwriteRoutes = false

      const setupFetchMocks = require('./dev/fetchMocks').default
      setupFetchMocks(packageName, fetchMock)

      const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks').default
      listFetchMocks('entity-list', fetchMock)

      fetchMock.spy()
    }

    const app = initApp('id', input)
    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class EntityDetailApp extends React.Component {
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

  render() {
    return this.app.component
  }
}

EntityDetailApp.propTypes = {
  entityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {}),
  navigationStrategy: navigationStrategy.propTypes,
  actionAppComponent: PropTypes.func
}

export default EntityDetailApp
