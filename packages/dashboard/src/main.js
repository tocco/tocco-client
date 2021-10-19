import React from 'react'
import PropTypes from 'prop-types'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, notification, actionEmitter} from 'tocco-app-extensions'

import DashboardContainer from './components/Dashboard/DashboardContainer'
import reducers, {sagas} from './modules/reducers'

const packageName = 'dashboard'

const EXTERNAL_EVENTS = [
  'emitAction'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = <DashboardContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, events.emitAction)
  const handleNotifications = !events.emitAction
  notification.addToStore(store, handleNotifications)

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

const DashboardApp = props => {
  const events = EXTERNAL_EVENTS.reduce((events, event) => {
    if (props[event]) {
      events[event] = props[event]
    }
    return events
  }, {})

  return initApp('dashboard', props, events).component
}

DashboardApp.propTypes = {
  navigationStrategy: PropTypes.object,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default DashboardApp
