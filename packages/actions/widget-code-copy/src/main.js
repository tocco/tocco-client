import PropTypes from 'prop-types'
import React from 'react'
import {appFactory, actionEmitter, externalEvents, notification} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import WidgetCodeCopy from './components/WidgetCodeCopyContainer'
import reducers, {sagas} from './modules/reducers'

const packageName = 'widget-code-copy'

const EXTERNAL_EVENTS = ['emitAction']

const initApp = (id, input, events, publicPath) => {
  const content = <WidgetCodeCopy />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, events.emitAction)
  notification.addToStore(store, false)
  externalEvents.addToStore(store, events)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [],
    publicPath,
    textResourceModules: ['component', 'common', packageName]
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

const WidgetCodeCopyApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

WidgetCodeCopyApp.propTypes = {
  selection: PropTypes.object.isRequired
}

export default WidgetCodeCopyApp
