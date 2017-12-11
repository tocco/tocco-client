import PropTypes from 'prop-types'
import React from 'react'
import {appFactory, notifier, errorLogging, actionEmitter, externalEvents} from 'tocco-util'
import reducers, {sagas} from './modules/reducers'
import DetailViewContainer from './containers/DetailViewContainer'
import {getDispatchActions} from './input'
const packageName = 'entity-detail'

const EXTERNAL_EVENTS = [
  'onSubGridRowClick',
  'onSubGridNavigateToCreate',
  'onEntityCreated',
  'onTouchedChange',
  'emitAction'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = (
    <div>
      <DetailViewContainer/>
    </div>
  )

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)
  actionEmitter.addToStore(store, events.emitAction)
  errorLogging.addToStore(store, false)
  notifier.addToStore(store, false)

  const actions = getDispatchActions(input)

  const app = appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions,
      publicPath,
      textResourceModules: ['component', 'common', 'entity-list', 'entity-detail']
    }
  )

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const reducers = require('./modules/reducers').default
      appFactory.hotReloadReducers(app.store, reducers)
    })
  }

  return app
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-detail') {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')

      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(fetchMock)

      const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks')
      listFetchMocks(fetchMock)

      fetchMock.spy()
    }

    const app = initApp('id', input)
    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class EntityDetailApp extends React.Component {
  constructor(props) {
    super(props)

    const events = EXTERNAL_EVENTS.reduce((events, event) => {
      if (props[event]) {
        events[event] = props[event]
      }
      return events
    }, {})

    this.app = initApp('id', props, events)
  }

  render() {
    return (
      <div>{this.app.renderComponent()}</div>
    )
  }
}

EntityDetailApp.propTypes = {
  entityName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['update', 'create']),
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default EntityDetailApp
