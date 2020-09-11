import React from 'react'
import PropTypes from 'prop-types'
import {reducer as reducerUtil, selection as selectionPropType} from 'tocco-util'
import {appFactory, externalEvents} from 'tocco-app-extensions'
import {hot} from 'react-hot-loader/root'

import reducers, {sagas} from './modules/reducers'
import ResourceSchedulerContainer from './containers/ResourceSchedulerContainer'
import {updateRequestedCalendars} from './modules/resourceScheduler/actions'

const packageName = 'resource-scheduler'

const EXTERNAL_EVENTS = [
  'onEventClick'
]

const initApp = (id, input, events, publicPath) => {
  const content = <ResourceSchedulerContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)

  const dispatchActions = [
    ...(input.selection && input.selection.type === 'ID'
    && input.actionProperties && input.actionProperties.calendarType
      ? [updateRequestedCalendars(input.actionProperties.calendarType, input.selection.ids)] : [])
  ]

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: dispatchActions,
      publicPath,
      textResourceModules: ['component', 'common', packageName]
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'resource-scheduler') {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')

      const setupFetchMocks = require('./dev/fetchMocks').default
      setupFetchMocks(packageName, fetchMock)
    }

    const app = initApp('dev', input)

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

export class ResourceSchedulerApp extends React.Component {
  constructor(props) {
    super(props)

    const events = EXTERNAL_EVENTS.reduce((events, event) => {
      if (props[event]) {
        events[event] = props[event]
      }
      return events
    }, {})

    this.app = initApp(props.id, props, events)
  }

  render() {
    return this.app.component
  }
}

ResourceSchedulerApp.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  onEventClick: PropTypes.func,
  selection: selectionPropType.propType,
  actionProperties: PropTypes.shape({
    calendarType: PropTypes.string
  })
}

export default hot(ResourceSchedulerApp)
