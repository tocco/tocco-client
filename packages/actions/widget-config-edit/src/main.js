import PropTypes from 'prop-types'
import {appFactory, selection, externalEvents, actionEmitter, notification} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import WidgetConfigDetailView from './components/WidgetConfigDetailView'
import reducers, {sagas} from './modules/reducers'

const packageName = 'widget-config-edit'
const EXTERNAL_EVENTS = ['onSuccess', 'emitAction']

const initApp = (id, input, events, publicPath) => {
  const content = <WidgetConfigDetailView selection={input.selection} />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, events.emitAction)
  notification.addToStore(store, false)
  externalEvents.addToStore(store, events)

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
          const reducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, reducers)
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
  }, {})
}

export default WidgetConfigEditApp
