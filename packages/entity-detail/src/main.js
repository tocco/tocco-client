import PropTypes from 'prop-types'
import React from 'react'
import {
  actionEmitter,
  actions,
  appFactory,
  errorLogging,
  externalEvents,
  formData,
  keyDown,
  notification
} from 'tocco-app-extensions'
import EntityListApp from 'tocco-entity-list/src/main'
import SimpleFormApp from 'tocco-simple-form/src/main'
import {navigationStrategy, reducer as reducerUtil} from 'tocco-util'

import DetailViewContainer from './containers/DetailViewContainer'
import customActions from './customActions'
import {getDispatchActions} from './input'
import reducers, {sagas} from './modules/reducers'
import shortcuts from './shortcuts'

const packageName = 'entity-detail'

const EXTERNAL_EVENTS = [
  'onSubGridRowClick',
  'onEntityCreated',
  'onEntityUpdated',
  'onEntityDeleted',
  'onTouchedChange',
  'onRefresh',
  'emitAction'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = <DetailViewContainer />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store, events.emitAction)
  errorLogging.addToStore(store, false)
  notification.addToStore(store, false)
  actions.addToStore(store, {
    formApp: SimpleFormApp,
    listApp: EntityListApp,
    customActions,
    appComponent: input.actionAppComponent,
    navigationStrategy: input.navigationStrategy,
    context: {
      viewName: 'detail',
      formName: input.formName
    }
  })
  formData.addToStore(store, {
    listApp: EntityListApp,
    detailApp: EntityDetailApp,
    navigationStrategy: input.navigationStrategy,
    chooseDocument: input.chooseDocument
  })
  keyDown.addToStore(store, shortcuts)

  const dispatchActions = getDispatchActions(input)

  const app = appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: dispatchActions,
    publicPath,
    textResourceModules: ['component', 'common', 'entity-list', 'entity-detail']
  })

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const reducers = require('./modules/reducers').default
      reducerUtil.hotReloadReducers(app.store, reducers)
    })
  }

  return app
}

;(() => {
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

const EntityDetailApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName: props.id, externalEvents: EXTERNAL_EVENTS})
  return component
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
  chooseDocument: PropTypes.func,
  actionAppComponent: PropTypes.func
}

export default EntityDetailApp
