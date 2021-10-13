import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory} from 'tocco-app-extensions'

import DashboardContainer from './components/Dashboard/DashboardContainer'
import reducers, {sagas} from './modules/reducers'

const packageName = 'dashboard'

const initApp = (id, input, events, publicPath) => {
  const content = <DashboardContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common', 'entity-list', packageName]
    }
  )
}

(() => {
  if (__PACKAGE_NAME__ === packageName) {
    appFactory.registerAppInRegistry(packageName, initApp)

    if (__DEV__) {
      const input = require('./dev/input.json')
  
      if (!__NO_MOCK__) {
        const fetchMock = require('fetch-mock').default
        fetchMock.config.overwriteRoutes = false
       
        const setupFetchMocks = require('./dev/fetchMocks').default
        setupFetchMocks(packageName, fetchMock)
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

class DashboardApp extends React.Component {
  constructor(props) {
    super(props)

    this.app = initApp('dashboard', props)
  }

  render() {
    return this.app.component
  }
}

DashboardApp.propTypes = {
}

export default DashboardApp
