import React from 'react'
import ReduxToastr from 'react-redux-toastr'

import {appFactory, storeFactory} from 'tocco-util'
import reducers, {sagas} from './modules/reducers'
import EntityBrowserContainer from './containers/EntityBrowserContainer'

import {validateAndGetDispatchActions} from './util/input'
import '!style-loader!css-loader!react-redux-toastr/lib/css/react-redux-toastr.css'

const packageName = 'entity-browser'

const initApp = (id, input, events, publicPath) => {
  const dispatchActions = validateAndGetDispatchActions(input)

  const toastrOptions = {
    newestOnTop: false,
    preventDuplicates: true,
    position: 'top-right',
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    progressBar: true
  }

  const content = <div>
    <ReduxToastr {...toastrOptions}/>
    <EntityBrowserContainer/>
  </div>

  return appFactory.createApp(
    packageName,
    content,
    reducers,
    sagas,
    input,
    events,
    dispatchActions,
    publicPath
  )
}

(() => {
  if (__DEV__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')

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

