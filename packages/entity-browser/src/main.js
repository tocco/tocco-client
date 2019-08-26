import React from 'react'
import {appFactory, notifier, errorLogging, actionEmitter, externalEvents, rest} from 'tocco-app-extensions'
import {Router} from 'react-router'
import createHashHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import PropTypes from 'prop-types'

import RouteWithSubRoutes from './components/RouteWithSubRoutes'

const packageName = 'entity-browser'

const textResourceSelector = (state, key) => state.intl.messages[key] || key

const createHistory = (store, memoryHistory) => {
  const historyFactory = memoryHistory ? createMemoryHistory : createHashHistory

  return historyFactory({
    getUserConfirmation: (message, callback) => {
      const state = store.getState()

      const okText = textResourceSelector(state, 'client.common.ok')
      const cancelText = textResourceSelector(state, 'client.common.cancel')

      const action = notifier.confirm(
        '',
        message,
        okText,
        cancelText,
        () => callback(true), // eslint-disable-line standard/no-callback-literal
        () => callback(false) // eslint-disable-line standard/no-callback-literal
      )
      store.dispatch(action)
    }
  })
}

const navigateToDetailIfKeySet = (history, input) => {
  const initialDetailViewKey = input.initialKey
  if (initialDetailViewKey && !isNaN(initialDetailViewKey)) {
    const regex = /\/detail\/[0-9]*/
    if (!history.location.pathname.match(regex)) {
      const path = `/detail/${input.initialKey}`
      history.push(path)
    }
  }

  return history
}

const initApp = (id, input, events, publicPath) => {
  input = {...input, id}
  if (input.nullBusinessUnit) {
    rest.setNullBusinessUnit(input.nullBusinessUnit)
  }

  const store = appFactory.createStore(undefined, undefined, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store)
  errorLogging.addToStore(store, true, ['console', 'remote', 'notifier'])
  notifier.addToStore(store, true)

  const history = createHistory(store, input.memoryHistory)
  navigateToDetailIfKeySet(history, input)

  const routes = require('./routes/index').default(store, input)

  const content = (
    <Router history={history}>
      <React.Fragment>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </React.Fragment>
    </Router>
  )

  const app = appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      publicPath,
      textResourceModules: ['component', 'common', 'entity-list', 'entity-detail']
    }
  )

  return app
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-browser') {
    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')

      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(packageName, fetchMock)

      fetchMock.spy()
    }

    const input = !__NO_MOCK__ ? require('./dev/input.json') : require('./dev/input-no-mock.json')

    const app = initApp('id', input)
    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class EntityBrowserApp extends React.Component {
  constructor(props) {
    super(props)
    this.app = initApp('id', props)
  }

  render() {
    return this.app.renderComponent()
  }
}

EntityBrowserApp.propTypes = {
  entityName: PropTypes.string.isRequired,
  showSearchForm: PropTypes.bool,
  disableSimpleSearch: PropTypes.bool,
  formBase: PropTypes.string,
  limit: PropTypes.number,
  preselectedSearchFields: PropTypes.array,
  searchFilters: PropTypes.array,
  simpleSearchFields: PropTypes.string,
  initialKey: PropTypes.string,
  nullBusinessUnit: PropTypes.bool,
  showCreateButton: PropTypes.bool,
  memoryHistory: PropTypes.bool
}

export default EntityBrowserApp
