import PropTypes from 'prop-types'
import {actionEmitter, appFactory, externalEvents, notification} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import SubscribeCalendar from './components/SubscribeCalendarCopyContainer'
import reducers, {sagas} from './modules/reducers'

const packageName = 'subscribe-calendar'

const EXTERNAL_EVENTS = ['emitAction', 'onError']

const initApp = (id, input, events, publicPath) => {
  const content = <SubscribeCalendar />

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
          const hotReloadedReducers = require('./modules/reducers').default
          reducerUtil.hotReloadReducers(app.store, hotReloadedReducers)
        })
      }

      appFactory.renderApp(app.component)
    }
  }
})()

const SubscribeCalendarApp = props => {
  return initApp(packageName, props, appFactory.getEvents(EXTERNAL_EVENTS, props)).component
}

SubscribeCalendarApp.propTypes = {
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default SubscribeCalendarApp
