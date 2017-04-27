import React from 'react'
import {appFactory, storeFactory} from 'tocco-util'

import reducers, {sagas} from './modules/reducers'
import EntityListContainer from './containers/EntityListContainer'
import {getDispatchActions} from './input'
const packageName = 'entity-list'

const initApp = (id, input, events, publicPath) => {
  const content = <EntityListContainer/>

  const store = appFactory.createStore(reducers, sagas, input)

  const actions = getDispatchActions(input)

  return appFactory.createApp(
    packageName,
    content,
    store,
    input,
    events,
    actions,
    publicPath
  )
}

(() => {
  if (__DEV__) {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    const fetchMock = require('fetch-mock')
    const setupFetchMocks = require('./dev/fetchMocks')
    setupFetchMocks(fetchMock)

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
    this.app = initApp('id', props)
  }

  render() {
    return (
      <div>{this.app.renderComponent()}</div>
    )
  }
}

EntityListApp.propTypes = {
  entityName: React.PropTypes.string.isRequired,
  formBase: React.PropTypes.string,
  formDefinition: React.PropTypes.object,
  limit: React.PropTypes.number,
  showSearchForm: React.PropTypes.bool,
  preselectedSearchFields: React.PropTypes.object,
  disableSimpleSearch: React.PropTypes.bool,
  simpleSearchFields: React.PropTypes.arrayOf(React.PropTypes.string)
}

export default EntityListApp
