import PropTypes from 'prop-types'
import React from 'react'
import {appFactory, externalEvents, selection} from 'tocco-app-extensions'
import {reducer as reducerUtil, navigationStrategy} from 'tocco-util'

import CopyProgress from './components/CopyProgress'
import reducers, {sagas} from './modules/reducers'

const packageName = 'copy'

const EXTERNAL_EVENTS = ['emitAction', 'onSuccess', 'onCancel', 'onError']

const initApp = (id, input, events, publicPath) => {
  const content = <CopyProgress />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
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
        const reducers = require('./modules/reducers').default
        reducerUtil.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

const CopyApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

CopyApp.propTypes = {
  selection: selection.propType.isRequired,
  navigationStrategy: navigationStrategy.propTypes.isRequired,
  context: PropTypes.shape({
    formName: PropTypes.string
  }),
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default CopyApp
