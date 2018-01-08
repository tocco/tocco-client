import React from 'react'
import {appFactory, externalEvents} from 'tocco-util'

import reducers, {sagas} from './modules/reducers'
import PropTypes from 'prop-types'

const packageName = 'simple-form'

const EXTERNAL_EVENTS = [
  'onSubmit',
  'onCancel'
]

const initApp = (id, input, events, publicPath) => {
  // workaround, if container gets imported normally, karma fails
  const Container = require('./containers/FormContainer').default
  const content = <div><Container/></div>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)

  const app = appFactory.createApp(
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

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const reducers = require('./modules/reducers').default
      appFactory.hotReloadReducers(app.store, reducers)
    })
  }

  return app
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === packageName) {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')
      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(fetchMock)
      fetchMock.spy()
    }

    const app = initApp(packageName, input)

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()

class SimpleFormApp extends React.Component {
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

SimpleFormApp.propTypes = {
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  form: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default SimpleFormApp
