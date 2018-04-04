import React from 'react'
import {appFactory, externalEvents, errorLogging} from 'tocco-util'
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
  if (__DEV__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')
  }

  if (__DEV__) {
    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(packageName, fetchMock)
    }

    const input = require('./dev/input.json')

    const app = initApp('id', input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        appFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
