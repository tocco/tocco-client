import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {actionEmitter, appFactory, externalEvents, notifier} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

import Merge from './components/Merge'
import reducers, {sagas} from './modules/reducers'
import {setSelection} from './modules/merge/actions'

const packageName = 'merge'

const EXTERNAL_EVENTS = [
  'emitAction',
  'onSuccess'
]

const initApp = (id, input, events = {}, publicPath) => {
  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, events.emitAction)
  externalEvents.addToStore(store, events)
  const handleNotifications = !events.emitAction
  notifier.addToStore(store, handleNotifications)

  const content = <>
    {handleNotifications && <notifier.Notifier/>}
    <Merge/>
  </>

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
  if (__PACKAGE_NAME__ === packageName) {
    appFactory.registerAppInRegistry(packageName, initApp)

    if (__DEV__) {
      const input = require('./dev/input.json')
      input.navigationStrategy = {}
      input.navigationStrategy.ListLink = ({children}) => children

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

export default MergeApp
