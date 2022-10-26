import PropTypes from 'prop-types'
import {actionEmitter, appFactory, cache, externalEvents, notification} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'
import {reducer as reducerUtil} from 'tocco-util'

import Merge from './components/Merge'
import reducers, {sagas} from './modules/reducers'

const packageName = 'merge'

const EXTERNAL_EVENTS = ['emitAction', 'onSuccess']

const initApp = (id, input, events, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, state => state.input.emitAction)
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))
  const handleNotifications = !events.emitAction
  notification.addToStore(store, handleNotifications)
  cache.addToStore(store)

  const content = (
    <>
      <GlobalStyles />
      {handleNotifications && <notification.Notifications />}
      <Merge />
    </>
  )

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    publicPath,
    textResourceModules: ['component', 'common', packageName]
  })
}

;(() => {
  if (__PACKAGE_NAME__ === packageName) {
    appFactory.registerAppInRegistry(packageName, initApp)

    if (__DEV__) {
      const input = require('./dev/input.json')
      input.navigationStrategy = {}
      input.navigationStrategy.ListLink = ({children}) => children

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

const MergeApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

MergeApp.propTypes = {
  selection: PropTypes.object,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default MergeApp
export const app = appFactory.createBundleableApp(packageName, initApp, MergeApp)
