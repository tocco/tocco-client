import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import consoleLogger from '../consoleLogger'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

import {LoadMask} from 'tocco-ui'

import storeFactory from '../storeFactory'
import intl from '../intl'
import externalEvents from '../externalEvents'
import {logError} from '../errorLogging'

export const createApp = (name, content, reducers, sagas, input, events, actions, publicPath) => {
  let store
  try {
    setWebpacksPublicPath(publicPath)
    const initialState = getIntialState(input)

    if (events) {
      externalEvents.registerEvents(events)
    }

    store = storeFactory.createStore(initialState, reducers, sagas)
    const initIntlPromise = setupIntl(input, store, name)

    dispatchActions(actions, store)
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

export const registerAppInRegistry = (appName, initFunction) => {
  if (window.reactRegistry) {
    window.reactRegistry.register(appName, initFunction)
  }
}

const dispatchActions = (actions, store) => {
  if (actions) {
    actions.forEach(action => {
      store.dispatch(action)
    })
  }
}

const getIntialState = input => {
  const initialState = window.__INITIAL_STATE__ || {}

  if (input) {
    initialState.input = input
  }
  return initialState
}

const setWebpacksPublicPath = publicPath => {
  if (publicPath) {
    /* eslint camelcase: 0 */
    __webpack_public_path__ = publicPath
  }
}

const getAppComponent = (store, initIntlPromise, name, content) => (
  <Provider store={store}>
    <LoadMask promises={[initIntlPromise]}>
      <IntlProvider>
        <div className={`tocco-${name}`}>
          {content}
        </div>
      </IntlProvider>
    </LoadMask>
  </Provider>
)

const setupIntl = (input, store, name) => {
  addLocaleData([...de, ...en, ...fr, ...it])
  const locale = input ? input.locale : null
  return intl.initIntl(store, name, locale)
}
