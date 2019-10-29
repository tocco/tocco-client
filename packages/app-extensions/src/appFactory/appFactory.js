import React from 'react'
import ReactDOM from 'react-dom'
import {addLocaleData} from 'react-intl'
import _union from 'lodash/union'
import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'
import {intl, consoleLogger} from 'tocco-util'

import errorLogging from '../errorLogging'
import App from './App'

export const createApp = (name,
  content,
  store,
  {
    input = {},
    actions = undefined,
    publicPath = undefined,
    textResourceModules = []
  }) => {
  try {
    const theme = input.customTheme

    if (publicPath) {
      setWebpacksPublicPath(publicPath)
    }

    if (actions) {
      dispatchActions(actions, store)
    }

    const initIntlPromise = setupIntl(input, store, name, textResourceModules)

    return {
      component: <App store={store} initIntlPromise={initIntlPromise} name={name} content={content} theme={theme} />,
      store,
      methods: {
        setLocale: locale => intl.setLocale(store, textResourceModules, locale)
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

export const renderApp = (App, mountElementName = 'root') => {
  const mountElement = document.getElementById(mountElementName)
  ReactDOM.render(App, mountElement)
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
  addLocaleData([...de, ...en, ...fr, ...it])
  const locale = input ? input.locale : null
  return intl.initIntl(store, modules, locale)
}
