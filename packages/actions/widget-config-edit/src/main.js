import PropTypes from 'prop-types'
import {appFactory, selection, externalEvents, actionEmitter, notification} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import WidgetConfigDetailView from './components/WidgetConfigDetailView'
import reducers, {sagas} from './modules/reducers'

const packageName = 'widget-config-edit'
const EXTERNAL_EVENTS = ['onSuccess', 'emitAction']

const initApp = (id, input, events, publicPath) => {
  const content = <WidgetConfigDetailView />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, state => state.input.emitAction)
  notification.addToStore(store, false)
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
    publicPath,
    textResourceModules: ['component', 'common', packageName]
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
          const hotReducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, hotReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const WidgetConfigEditApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

WidgetConfigEditApp.propTypes = {
  selection: selection.propType.isRequired,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {}),
  listApp: PropTypes.func,
  docsApp: PropTypes.func
}

export default WidgetConfigEditApp
