import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import consoleLogger from '../consoleLogger'
import _union from 'lodash/union'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

import {LoadMask} from 'tocco-ui'

import storeFactory from '../storeFactory'
import intl from '../intl'
import externalEvents from '../externalEvents'
import {logError} from '../errorLogging'
import {getRequest} from '../rest'

export const createStore = (reducers, sagas, input, name) => {
  const initialState = getIntialState(input)
  return storeFactory.createStore(initialState, reducers, sagas, name)
}

export const createApp = (name,
                          content,
                          store,
                          {
                            input = {},
                            events = undefined,
                            actions = undefined,
                            publicPath = undefined,
                            textResourceModules = []
                          }) => {
  try {
    if (publicPath) {
      setWebpacksPublicPath(publicPath)
    }

    if (events) {
      externalEvents.registerEvents(events)
    }

    if (actions) {
      dispatchActions(actions, store)
    }

    const initIntlPromise = setupIntl(input, store, name, textResourceModules)
    const component = getAppComponent(store, initIntlPromise, name, content)

    return {
      renderComponent: () => component,
      store,
      methods: {
        setLocale: locale => intl.setLocale(store, name, locale)
      }
    }
  } catch (error) {
    try {
      if (store) {
        store.dispatch(logError('Error', 'Error creating react application: ', error))
      }
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

const getIntialState = input => {
  const initialState = window.__INITIAL_STATE__ || {}

  if (input) {
    initialState.input = input
  }
  return initialState
}

const setWebpacksPublicPath = publicPath => {
  /* eslint camelcase: 0 */
  __webpack_public_path__ = publicPath
}

const getAppComponent = (store, initIntlPromise, name, content) => (
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
)

const setupIntl = (input, store, module, textResourceModules) => {
  const modules = _union(textResourceModules, [module])
  addLocaleData([...de, ...en, ...fr, ...it])
  const requestedLocale = input ? input.locale : null
  const bestLocale = getRequest(`locales/best`, {'for': requestedLocale}, [])
      .then(resp => resp.body)
      .then(json => json.best)
  return intl.initIntl(store, modules, bestLocale)
}
