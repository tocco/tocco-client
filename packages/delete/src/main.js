import React from 'react'
import {reducer as reducerUtil, selection} from 'tocco-util'
import {appFactory, externalEvents} from 'tocco-app-extensions'
import {hot} from 'react-hot-loader/root'

import reducers, {sagas} from './modules/reducers'
import Delete from './components/Delete'

const packageName = 'delete'

const EXTERNAL_EVENTS = [
  'onSuccess',
  'onCancel',
  'onError'
]

const initApp = (id, input, events, publicPath) => {
  const content = <Delete/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common', packageName]
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === packageName) {
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

    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

const DeleteApp = props => {
  const events = EXTERNAL_EVENTS.reduce((acc, event) => ({
    ...acc,
    ...(props[event] ? {[event]: props[event]} : {})
  }), {})

  return initApp('delete', props, events).component
}

DeleteApp.propTypes = {
  selection: selection.propType
}

export default hot(DeleteApp)
