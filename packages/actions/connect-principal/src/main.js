import PropTypes from 'prop-types'
import {actionEmitter, appFactory, externalEvents, selection} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import Progress from './components/Progress'
import reducers, {sagas} from './modules/reducers'

const packageName = 'connect-principal'

const EXTERNAL_EVENTS = ['emitAction', 'onSuccess', 'onError']

const initApp = (id, input, events, publicPath) => {
  const content = <Progress />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, state => state.input.emitAction)
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

const ConnectPrincipalApp = props => {
  const events = EXTERNAL_EVENTS.reduce((accEvents, event) => {
    if (props[event]) {
      accEvents[event] = props[event]
    }
    return accEvents
  }, {})

  return initApp(packageName, props, events).component
}

ConnectPrincipalApp.propTypes = {
  selection: selection.propType.isRequired,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default ConnectPrincipalApp
