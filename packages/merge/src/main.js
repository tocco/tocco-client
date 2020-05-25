import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, errorLogging, externalEvents} from 'tocco-app-extensions'

import MergeWizardContainer from './containers/MergeWizardContainer'
import {getDispatchActions} from './utils/input'
import reducers, {sagas} from './modules/reducers'

const packageName = 'merge'

const initApp = (id, input, events = {}, publicPath) => {
  const actions = getDispatchActions(input)

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  errorLogging.addToStore(store, true, ['console', 'remote'])

  return appFactory.createApp(
    packageName,
    <MergeWizardContainer/>,
    store,
    {
      input,
      actions,
      publicPath
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'merge') {
    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks').default
      setupFetchMocks(packageName, fetchMock)
    }

    const input = require('./dev/input.json')

    const app = initApp('id', input)

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
