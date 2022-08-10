import PropTypes from 'prop-types'
import {appFactory, externalEvents, selection} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import SelectionContainer from './components/Selection/SelectionContainer'
import reducers, {sagas} from './modules/reducers'

const packageName = 'entity-report'

const EXTERNAL_EVENTS = ['onSuccess', 'onError']

const initApp = (id, input, events, publicPath) => {
  const content = <SelectionContainer />
  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
    publicPath,
    textResourceModules: ['actions', 'component', 'common', packageName]
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

const EntityReportApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

EntityReportApp.propTypes = {
  selection: selection.propType.isRequired,
  actionProperties: PropTypes.shape({
    pathToReports: PropTypes.string.isRequired
  }),
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default EntityReportApp
