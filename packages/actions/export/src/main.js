import PropTypes from 'prop-types'
import {appFactory, formData, templateValues, selection, externalEvents} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import Export from './components/ExportContainer'
import reducers, {sagas} from './modules/reducers'

const packageName = 'export'

const EXTERNAL_EVENTS = ['onSuccess']

const initApp = (id, input, events, publicPath) => {
  const content = <Export />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  formData.addToStore(store, {})
  templateValues.addToStore(store)
  externalEvents.addToStore(store, events)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
    publicPath,
    textResourceModules: ['actions', 'entities', 'entity-list', 'client', 'component', 'common', 'rest', packageName]
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

const ExportApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

ExportApp.propTypes = {
  selection: selection.propType.isRequired,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default ExportApp
