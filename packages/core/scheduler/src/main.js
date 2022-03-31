import PropTypes from 'prop-types'
import {appFactory, externalEvents} from 'tocco-app-extensions'
import {react, reducer as reducerUtil} from 'tocco-util'

import SchedulerContainer from './containers/SchedulerContainer'
import {getDispatchActions} from './input'
import reducers, {sagas} from './modules/reducers'

const packageName = 'scheduler'

const EXTERNAL_EVENTS = ['onDateRangeChange', 'onCalendarRemove', 'onCalendarRemoveAll', 'onEventClick', 'onRefresh']

const initApp = (id, input, events, publicPath) => {
  const content = <SchedulerContainer />

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  externalEvents.addToStore(store, events)

  return appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: getDispatchActions(input),
    publicPath,
    textResourceModules: ['component', 'common', packageName]
  })
}

;(() => {
  if (__PACKAGE_NAME__ === 'scheduler') {
    appFactory.registerAppInRegistry(packageName, initApp)

    if (__DEV__) {
      const input = require('./dev/input.json')

      if (!__NO_MOCK__) {
        const fetchMock = require('fetch-mock').default
        fetchMock.config.overwriteRoutes = false
        const setupFetchMocks = require('./dev/fetchMocks').default
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

      appFactory.renderApp(app.component)
    }
  }
})()

const SchedulerApp = props => {
  const {component, store} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})

  react.useDidUpdate(() => {
    getDispatchActions(props).forEach(action => {
      if (component != null) {
        store.dispatch(action)
      }
    })
  }, [props])

  return component
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
        })
      ),
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired
    })
  ),
  schedulerRef: PropTypes.object,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => ({...propTypes, [event]: PropTypes.func}), {}),
  locale: PropTypes.string
}

export default SchedulerApp
