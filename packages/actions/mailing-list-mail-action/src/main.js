import PropTypes from 'prop-types'
import {appFactory, selection, formData, externalEvents, actionEmitter} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import MailAction from './components/MailAction'
import reducers, {sagas} from './modules/reducers'

const packageName = 'mailing-list-mail-action'

const EXTERNAL_EVENTS = ['onSuccess', 'onError']

const initApp = (id, input, events, publicPath) => {
  const content = <MailAction />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  formData.addToStore(store, {})
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
    publicPath,
    textResourceModules: ['component', 'common', 'actions', packageName]
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

const MailingListMailAction = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

MailingListMailAction.propTypes = {
  selection: selection.propType.isRequired,
  actionProperties: PropTypes.object.isRequired
}

export default MailingListMailAction
