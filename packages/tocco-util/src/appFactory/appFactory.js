import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import consoleLogger from '../consoleLogger'
import _union from 'lodash/union'
import _merge from 'lodash/merge'
import {ThemeProvider} from 'styled-components'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

import {LoadMask} from 'tocco-ui'
import {ToccoTheme} from 'tocco-theme'

import intl from '../intl'
import errorLogging from '../errorLogging'

export const createApp = (name,
  content,
  store,
  {
    input = {},
    actions = undefined,
    publicPath = undefined,
    textResourceModules = [],
    customTheme = {}
  }) => {
  try {
    const theme = _merge({}, ToccoTheme, customTheme)

    if (publicPath) {
      setWebpacksPublicPath(publicPath)
    }

    if (actions) {
      dispatchActions(actions, store)
    }

    const initIntlPromise = setupIntl(input, store, name, textResourceModules)
    const component = getAppComponent(store, initIntlPromise, name, content, theme)

    return {
      renderComponent: () => component,
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

export const renderApp = (app, mountElementName = 'root') => {
  const mountElement = document.getElementById(mountElementName)
  let render = () => {
    ReactDOM.render(app, mountElement)
  }

  if (__DEV__ && module.hot) {
    const renderApp = render
    const renderError = error => {
      const RedBox = require('redbox-react')

      ReactDOM.render(<RedBox error={error}/>, mountElement)
    }
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }
  }
  render()
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

const getAppComponent = (store, initIntlPromise, name, content, theme) => (
  <ThemeProvider theme={theme}>
    <div className="tocco-ui-theme">
      <Provider store={store}>
        <LoadMask promises={[initIntlPromise]}>
          <IntlProvider>
            <div className={`tocco-${name}`}>
              {content}
            </div>
          </IntlProvider>
        </LoadMask>
      </Provider>
    </div>
  </ThemeProvider>
)

const setupIntl = (input, store, module, textResourceModules) => {
  const modules = _union([module], textResourceModules)
  addLocaleData([...de, ...en, ...fr, ...it])
  const locale = input ? input.locale : null
  return intl.initIntl(store, modules, locale)
}
