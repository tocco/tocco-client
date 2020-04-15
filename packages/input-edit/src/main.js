import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory} from 'tocco-app-extensions'
import {hot} from 'react-hot-loader/root'
import PropTypes from 'prop-types'

import reducers, {sagas} from './modules/reducers'
import InputEdit from './components/InputEdit/InputEditContainer'

const packageName = 'input-edit'

const initApp = (id, input, events, publicPath) => {
  const content = <InputEdit/>

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
      textResourceModules: ['component', 'common', packageName]
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

    appFactory.renderApp(app.component)
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

const InputEditApp = props => {
  return initApp('input-edit', props).component
}

InputEditApp.propTypes = {
  inputEntityKey: PropTypes.number.isRequired
}

export default hot(InputEditApp)
