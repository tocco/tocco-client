import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {reducer as reducerUtil} from 'tocco-util'
import {
  actionEmitter,
  appFactory,
  cache,
  errorLogging,
  externalEvents,
  keyDown,
  login,
  notification
} from 'tocco-app-extensions'
import chooseDocument from 'tocco-docs-browser/src/modules/chooseDocument'
import PropTypes from 'prop-types'

import shortcuts from './shortcuts'
import reducers, {sagas} from './modules/reducers'

const packageName = 'admin'

const LazyLoginGuard = React.lazy(() => import('./components/LoginGuard'))
const LazyAdmin = () => (
  <div>
    <Suspense fallback="">
      <LazyLoginGuard/>
    </Suspense>
  </div>
)

const initApp = (id, input, events, publicPath) => {
  if (window.reactRegistry && window.reactRegistry.setReact) {
    window.reactRegistry.setReact(React, ReactDOM)
  }

  const content = <LazyAdmin/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notification'])
  notification.addToStore(store, true, {withNotificationCenter: true})
  login.addToStore(store)
  cache.addToStore(store)
  keyDown.addToStore(store, shortcuts)
  chooseDocument.addToStore(store)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: [
        'component', 'common', 'actions', 'login', 'sso-login', 'entity-browser',
        'entity-list', 'entity-detail', 'dashboard', 'docs-browser', packageName
      ]
    }
  )
}

(() => {
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

    const App = () => app.component
    appFactory.renderApp(<App/>)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class AdminApp extends React.Component {
  constructor(props) {
    super(props)
    this.app = initApp('id', props)
  }

  render() {
    return this.app.component
  }
}

AdminApp.propTypes = {
  baseRoute: PropTypes.string
}

export default AdminApp
