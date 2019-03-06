import React from 'react'
import {reducer as reducerUtil} from 'tocco-util'
import {appFactory, externalEvents, formData, notifier, actionEmitter} from 'tocco-app-extensions'
import PropTypes from 'prop-types'

import reducers, {sagas} from './modules/reducers'
import FormContainer from './containers/FormContainer'
const packageName = 'simple-form'

const EXTERNAL_EVENTS = [
  'onSubmit',
  'onCancel',
  'onChange',
  'emitAction'
]

const initApp = (id, input, events = {}, publicPath) => {
  const content = <FormContainer listApp={input.listApp}/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, events.emitAction)
  externalEvents.addToStore(store, events)
  formData.addToStore(store, {data: input.formData, listApp: input.listApp})
  notifier.addToStore(store, false)

  const app = appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common']
    }
  )

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const reducers = require('./modules/reducers').default
      reducerUtil.hotReloadReducers(app.store, reducers)
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
      setupFetchMocks(packageName, fetchMock)
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
  hideButton: PropTypes.bool,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  form: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  formData: formData.formDataPropType,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {})
}

export default SimpleFormApp
