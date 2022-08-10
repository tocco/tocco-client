import PropTypes from 'prop-types'
import {actionEmitter, appFactory, externalEvents, notification, selection} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import Delete from './components/Delete'
import reducers, {sagas} from './modules/reducers'

const packageName = 'delete'

const EXTERNAL_EVENTS = ['onSuccess', 'onCancel', 'onError', 'emitAction']

const initApp = (id, input, events, publicPath) => {
  const content = <Delete />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, state => state.input.emitAction)
  const handleNotifications = !events.emitAction
  notification.addToStore(store, handleNotifications)
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
  if (__DEV__ && __PACKAGE_NAME__ === packageName) {
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
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

const DeleteApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

DeleteApp.propTypes = {
  selection: selection.propType.isRequired,
  customDeleteEndpoint: PropTypes.string
}

export default DeleteApp
export const app = appFactory.createBundleableApp(packageName, initApp, DeleteApp)
