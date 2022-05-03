import PropTypes from 'prop-types'
import {
  actionEmitter,
  appFactory,
  cache,
  errorLogging,
  externalEvents,
  notification,
  formData,
  form
} from 'tocco-app-extensions'
import EntityListApp from 'tocco-entity-list/src/main'
import {reducer as reducerUtil, env, appContext} from 'tocco-util'

import AddressUpdate from './components/AddressUpdate'
import {getDispatchActions} from './input'
import reducers, {sagas, formSagaConfig} from './modules/reducers'

const packageName = 'address-update'

const initApp = (id, input, events = {}, publicPath) => {
  env.setInputEnvs(input)

  const content = <AddressUpdate />

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  notification.addToStore(store, true)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  form.addToStore(store, formSagaConfig)
  formData.addToStore(store, {
    listApp: EntityListApp
  })
  cache.addToStore(store)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: getDispatchActions(),
    publicPath,
    textResourceModules: ['component', 'common', 'docs-browser', 'entity-detail', packageName]
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

const AddressUpdateApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName})
  return component
}

AddressUpdateApp.propTypes = {
  formName: PropTypes.string.isRequired,
  appContext: appContext.propTypes.isRequired,
  backendUrl: PropTypes.string
}

export default AddressUpdateApp
