import PropTypes from 'prop-types'
import {
  actionEmitter,
  appFactory,
  cache,
  errorLogging,
  externalEvents,
  notification,
  selection as selectionPropType
} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'
import {reducer as reducerUtil} from 'tocco-util'

import ResourceSchedulerContainer from './containers/ResourceSchedulerContainer'
import {getDispatchActions} from './input'
import reducers, {sagas} from './modules/reducers'

const packageName = 'resource-scheduler'

const EXTERNAL_EVENTS = ['onEventClick']

const initApp = (id, input, events, publicPath) => {
  const content = (
    <>
      <GlobalStyles />
      <ResourceSchedulerContainer />
    </>
  )
  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store, events.emitAction)

  const handleNotifications = !events.emitAction

  notification.addToStore(store, handleNotifications)
  errorLogging.addToStore(store, handleNotifications)
  cache.addToStore(store)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: getDispatchActions(input, handleNotifications),
    publicPath,
    textResourceModules: ['component', 'common', packageName, 'entity-list', 'scheduler']
  })
}

;(() => {
  if (__PACKAGE_NAME__ === 'resource-scheduler') {
    appFactory.registerAppInRegistry(packageName, initApp)

    if (__DEV__) {
      const input = require('./dev/input.json')

      if (!__NO_MOCK__) {
        const fetchMock = require('fetch-mock').default
        fetchMock.config.overwriteRoutes = false

        const setupFetchMocks = require('./dev/fetchMocks').default
        setupFetchMocks(packageName, fetchMock)
      }

      const app = initApp('dev', input, {})

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

const ResourceSchedulerApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName: props.id, externalEvents: EXTERNAL_EVENTS})
  return component
}

ResourceSchedulerApp.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  onEventClick: PropTypes.func,
  selection: selectionPropType.propType,
  actionProperties: PropTypes.shape({
    calendarType: PropTypes.string
  })
}

export default ResourceSchedulerApp
