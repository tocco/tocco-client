import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, notifier, errorLogging, actionEmitter, externalEvents, keyDown} from 'tocco-app-extensions'
import {hot} from 'react-hot-loader/root'
import PropTypes from 'prop-types'

import shortcuts from './shortcuts'
import reducers, {sagas} from './modules/reducers'
import LoginGuard from './components/LoginGuard'
const packageName = 'admin'

const initApp = (id, input, events, publicPath) => {
  const content = <LoginGuard/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notifier'])
  notifier.addToStore(store, true)
  keyDown.addToStore(store, shortcuts)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common', 'entity-browser', 'entity-list', 'entity-detail', packageName]
    }
  )
}

(() => {
  if (__DEV__) {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
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

    const App = hot(() => app.component)
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

export default hot(AdminApp)
