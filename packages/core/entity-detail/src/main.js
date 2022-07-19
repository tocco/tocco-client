import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _pickBy from 'lodash/pickBy'
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
import {navigationStrategy, react, reducer as reducerUtil} from 'tocco-util'

import {SaveButton} from './components/Actions'
import ErrorItems from './components/ErrorItems'
import DetailViewContainer from './containers/DetailViewContainer'
import customActions from './customActions'
import {getDispatchActions} from './input'
import {pendingChangesHandler} from './modules/actions/sagas'
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
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store, events.emitAction)
  errorLogging.addToStore(store, false)
  notification.addToStore(store, false)
  form.addToStore(store, formSagaConfig)
  reports.addToStore(store)
  actions.addToStore(store, {
    formApp: SimpleFormApp,
    listApp: EntityListApp,
    customActions,
    appComponent: input.actionAppComponent,
    navigationStrategy: input.navigationStrategy,
    context: {
      viewName: 'detail',
      formName: input.formName
    },
    customPreparationHandlers: [pendingChangesHandler]
  })
  formData.addToStore(store, {
    listApp: EntityListApp,
    detailApp: EntityDetailApp,
    navigationStrategy: input.navigationStrategy,
    chooseDocument: input.chooseDocument
  })
  keyDown.addToStore(store, shortcuts)

  const app = appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: getDispatchActions(input),
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

    const app = initApp('id', input)
    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

const EntityDetailApp = props => {
  const {component, store} = appFactory.useApp({initApp, props, packageName: props.id, externalEvents: EXTERNAL_EVENTS})

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
  actionAppComponent: PropTypes.func,
  modifyFormDefinition: PropTypes.func,
  reportIds: PropTypes.arrayOf(PropTypes.string)
}

export default EntityDetailApp
export {SaveButton, ErrorItems}
