import React from 'react'
import {appFactory, storeFactory} from 'tocco-util'

import reducers, {sagas} from './modules/reducers'
import EntityListContainer from './containers/EntityListContainer'
import {getDispatchActions} from './input'
const packageName = 'entity-list'

const EXTERNAL_EVENTS = [
  'onRowClick'
]

const initApp = (id, input, events, publicPath) => {
  const content = <EntityListContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)

  const actions = getDispatchActions(input)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions,
      publicPath,
      textResourceModules: ['componet', 'common']
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'entity-list') {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(fetchMock)
    }

    const app = initApp('id', input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        storeFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class EntityListApp extends React.Component {
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

EntityListApp.propTypes = {
  entityName: React.PropTypes.string.isRequired,
  formBase: React.PropTypes.string.isRequired,
  limit: React.PropTypes.number,
  showSearchForm: React.PropTypes.bool,
  searchFilters: React.PropTypes.arrayOf(React.PropTypes.string),
  preselectedSearchFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.arrayOf(React.PropTypes.number),
        React.PropTypes.arrayOf(React.PropTypes.string)
      ]),
      hidden: React.PropTypes.bool
    })
  ),
  disableSimpleSearch: React.PropTypes.bool,
  simpleSearchFields: React.PropTypes.string,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = React.PropTypes.func
    return propTypes
  }, {})
}

export default EntityListApp
