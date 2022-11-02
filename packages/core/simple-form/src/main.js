import PropTypes from 'prop-types'
import {appFactory, externalEvents, formData, notification, actionEmitter, form} from 'tocco-app-extensions'
import {reducer as reducerUtil} from 'tocco-util'

import FormContainer from './containers/FormContainer'
import reducers, {sagas} from './modules/reducers'
import {setFieldDefinitions} from './modules/simpleForm/actions'
const packageName = 'simple-form'

const EXTERNAL_EVENTS = ['onSubmit', 'onCancel', 'onChange', 'emitAction']

const initApp = (id, input, events, publicPath) => {
  const content = <FormContainer />

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  actionEmitter.addToStore(store, state => state.input.emitAction)
  externalEvents.addToStore(store, state => appFactory.getEvents(EXTERNAL_EVENTS, state.input))
  formData.addToStore(store, state => ({initialData: state.input.formData, listApp: state.input.listApp}))
  notification.addToStore(store, false)

  const app = appFactory.createApp(packageName, content, store, {
    input,
    events,
    actions: [setFieldDefinitions(form.getFieldDefinitions(input.form))],
    publicPath,
    textResourceModules: ['component', 'common']
  })

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const hotReducers = require('./modules/reducers').default
      reducerUtil.hotReloadReducers(app.store, hotReducers)
    })
  }

  return app
}

;(() => {
  if (__PACKAGE_NAME__ === packageName) {
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

      const app = initApp(packageName, input)

      appFactory.renderApp(app.component)
    }
  }
})()

const SimpleFormApp = props => {
  const {component} = appFactory.useApp({initApp, props, packageName, externalEvents: EXTERNAL_EVENTS})
  return component
}

SimpleFormApp.propTypes = {
  hideButton: PropTypes.bool,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  form: PropTypes.object.isRequired,
  validate: PropTypes.bool,
  ...EXTERNAL_EVENTS.reduce((propTypes, event) => {
    propTypes[event] = PropTypes.func
    return propTypes
  }, {}),
  defaultValues: PropTypes.object,
  beforeRenderField: PropTypes.func
}

export default SimpleFormApp
