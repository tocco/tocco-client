import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, externalEvents} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

import reducers, {sagas} from './modules/reducers'
import SchedulerContainer from './containers/SchedulerContainer'
import {getDispatchActions} from './input'

const packageName = 'scheduler'

const EXTERNAL_EVENTS = [
  'onDateRangeChange',
  'onCalendarRemove',
  'onEventClick',
  'onRefresh'
]

const initApp = (input, events, publicPath) => {
  const content = <SchedulerContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  externalEvents.addToStore(store, events)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: getDispatchActions(input),
      publicPath,
      textResourceModules: ['component', 'common', packageName]
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'scheduler') {
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(packageName, fetchMock)
      fetchMock.spy()
    }

    const app = initApp(input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        reducerUtil.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class SchedulerApp extends React.Component {
  constructor(props) {
    super(props)

    const events = EXTERNAL_EVENTS.reduce((events, event) => {
      if (props[event]) {
        events[event] = props[event]
      }
      return events
    }, {})

    this.app = initApp(props, events)
  }

  componentDidUpdate(prevProps) {
    getDispatchActions(this.props).forEach(action => {
      this.app.store.dispatch(action)
    })
  }

  render = () => <div>{this.app.renderComponent()}</div>
}

SchedulerApp.propTypes = {
  calendars: PropTypes.arrayOf(
    PropTypes.shape({
      calendarType: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
          start: PropTypes.number,
          end: PropTypes.number,
          allDay: PropTypes.bool
        }
        )
      ),
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired
    })),
  onDateRangeChange: PropTypes.func,
  onCalendarRemove: PropTypes.func,
  onEventClick: PropTypes.func,
  locale: PropTypes.string
}

export default SchedulerApp
