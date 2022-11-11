import PropTypes from 'prop-types'
import {
  actionEmitter,
  actions,
  appFactory,
  errorLogging,
  externalEvents,
  formData,
  keyDown,
  notification,
  form,
  reports
} from 'tocco-app-extensions'
import EntityListApp from 'tocco-entity-list/src/main'
import SimpleFormApp from 'tocco-simple-form/src/main'
import {navigationStrategy, reducer as reducerUtil} from 'tocco-util'

import {SaveButton} from './components/Actions'
import ErrorItems from './components/ErrorItems'
import DetailViewContainer from './containers/DetailViewContainer'
import customActions from './customActions'
import {pendingChangesHandler} from './modules/actions/sagas'
import {loadDetailView} from './modules/entityDetail/actions'
import reducers, {sagas, formSagaConfig} from './modules/reducers'
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

const initApp = (id, input, events, publicPath) => {
  const content = <DetailViewContainer />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))
  actionEmitter.addToStore(store, state => state.input.emitAction)
  errorLogging.addToStore(store, false)
  notification.addToStore(store, false)
  form.addToStore(store, formSagaConfig)
  reports.addToStore(store)
  actions.addToStore(store, state => ({
    formApp: SimpleFormApp,
    listApp: EntityListApp,
    customActions: {
      ...customActions,
      ...(state.input.customActions || {})
    },
    appComponent: state.input.actionAppComponent,
    navigationStrategy: state.input.navigationStrategy,
    context: {
      viewName: 'detail',
      formName: state.input.formName
    },
    customPreparationHandlers: [pendingChangesHandler]
  }))
  formData.addToStore(store, state => ({
    listApp: EntityListApp,
    detailApp: EntityDetailApp,
    navigationStrategy: state.input.navigationStrategy,
    chooseDocument: state.input.chooseDocument
  }))
  keyDown.addToStore(store, shortcuts)

  const app = appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [loadDetailView()],
    publicPath,
    textResourceModules: ['actiongroup', 'component', 'common', 'entity-list', 'entity-detail']
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

    const app = initApp(packageName, input)
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
  entityId: PropTypes.string,
  formName: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  defaultValues: PropTypes.array,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {}),
  navigationStrategy: navigationStrategy.propTypes,
  chooseDocument: PropTypes.func,
  actionAppComponent: PropTypes.elementType,
  customActions: PropTypes.object,
  customRenderedActions: PropTypes.objectOf(PropTypes.func),
  modifyFormDefinition: PropTypes.func,
  reportIds: PropTypes.arrayOf(PropTypes.string)
}

export default EntityDetailApp
export {SaveButton, ErrorItems}
