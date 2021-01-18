import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, externalEvents} from 'tocco-app-extensions'
import PropTypes from 'prop-types'
import {hot} from 'react-hot-loader/root'

import Merge from './components/Merge'
import reducers, {sagas} from './modules/reducers'
import {setSelection} from './modules/merge/actions'

const packageName = 'merge'

const EXTERNAL_EVENTS = [
  'emitAction',
  'onSuccess',
  'openEntityList'
]

const initApp = (id, input, events, publicPath) => {
  const content = <Merge/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [
        setSelection(input.selection)
      ],
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

const MergeApp = props => {
  const events = EXTERNAL_EVENTS.reduce((events, event) => {
    if (props[event]) {
      events[event] = props[event]
    }
    return events
  }, {})

  return initApp('merge', props, events).component
}

MergeApp.propTypes = {
  selection: PropTypes.object,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default hot(MergeApp)
