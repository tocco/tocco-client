import _union from 'lodash/union'
import ReactDOM from 'react-dom'
import {consoleLogger, intl} from 'tocco-util'

import cache from '../cache'
import errorLogging from '../errorLogging'
import App from './App'
import {inputInitialized} from './store/input'

export const createApp = (
  name,
  content,
  store,
  {input = {}, actions = undefined, publicPath = undefined, textResourceModules = []}
) => {
  try {
    const theme = input.customTheme

    if (publicPath) {
      setWebpacksPublicPath(publicPath)
    }

    if (actions) {
      dispatchActions(actions, store)
    }

    store.dispatch(inputInitialized())
    store.dispatch(cache.initialise())

    const initIntlPromise = setupIntl(input, store, name, textResourceModules)

    return {
      component: <App store={store} initIntlPromise={initIntlPromise} content={content} theme={theme} />,
      store,
      methods: {
        setLocale: locale => intl.changeLocale(store, textResourceModules, locale)
      }
    }
  } catch (error) {
    try {
      store.dispatch(errorLogging.logError('Error', 'Error creating react application: ', error))
    } catch (loggingError) {
      consoleLogger.logError('Error creating react application: ', error)
      consoleLogger.logError('Unable to log error: ', loggingError)
    }
  }
}

export const renderApp = (app, mountElementName = 'root') => {
  const mountElement = document.getElementById(mountElementName)
  ReactDOM.render(app, mountElement)
}

export const reloadApp = (app, mountElementName = 'root') => {
  const mountElement = document.getElementById(mountElementName)
  ReactDOM.unmountComponentAtNode(mountElement)
  renderApp(app, mountElementName)
}

export const registerAppInRegistry = (appName, initFunction) => {
  if (window.reactRegistry) {
    window.reactRegistry.register(appName, initFunction)
  }
}

export const createBundleableApp = (name, init, app) => ({
  name,
  init,
  App: app,
  setWebpacksPublicPath
})

const dispatchActions = (actions, store) => {
  actions.forEach(action => {
    store.dispatch(action)
  })
}

const setWebpacksPublicPath = publicPath => {
  /* eslint camelcase: 0 */
  __webpack_public_path__ = publicPath
}

const setupIntl = (input, store, module, textResourceModules) => {
  const modules = _union([module], textResourceModules)
  const locale = input ? input.locale : null
  return intl.initIntl(store, modules, locale)
}
