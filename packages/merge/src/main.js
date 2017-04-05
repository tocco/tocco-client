import React from 'react'
import {appFactory, storeFactory} from 'tocco-util'
import MergeWizardContainer from './containers/MergeWizardContainer'
import {getDispatchActions} from './utils/input'
//
import reducers, {sagas} from './modules/reducers'

const packageName = 'merge'

const initApp = (id, input, events, publicPath) => {
  const dispatchActions = getDispatchActions(input)

  const store = appFactory.createStore(reducers, sagas, input)

  return appFactory.createApp(
    packageName,
    <MergeWizardContainer/>,
    store,
    input,
    events,
    dispatchActions,
    publicPath
  )
}

(() => {
  if (__DEV__ || __NICE2_11_LEGACY__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')
  }

  if (__DEV__) {
    const fetchMock = require('fetch-mock')
    const setupFetchMocks = require('./dev/fetchMocks')
    setupFetchMocks(fetchMock)

    const input = require('./dev/input.json')

    const app = initApp('id', input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        let reducers = require('./modules/reducers').default
        storeFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
