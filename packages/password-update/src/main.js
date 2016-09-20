import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import {StoreFactory, ExternalEvents, Intl} from 'tocco-util'
import {LoadMask} from 'tocco-ui'
import reducers, {sagas} from './modules/reducers'
import PasswordUpdateDialog from './containers/PasswordUpdateDialogContainer'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

const init = (id, input, externalEvents) => {
  try {
    var initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}
    if (__DEV__) {
      input = require('./dev_input.json')
    }

    if (input) {
      initialState.input = input
    }

    if (externalEvents) ExternalEvents.registerEvents(externalEvents)

    const store = StoreFactory.createStore(initialState, reducers, sagas)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        let reducers = require('./modules/reducers').default
        StoreFactory.hotReloadReducers(store, reducers)
      })
    }

    addLocaleData([...de, ...en, ...fr, ...it])
    const initIntlPromise = Intl.initIntl(store, 'action.passwordUpdate')

    const App = () => (
      <Provider store={store}>
        <LoadMask promises={[initIntlPromise]}>
          <IntlProvider>
            <PasswordUpdateDialog/>
          </IntlProvider>
        </LoadMask>
      </Provider>
    )

    return App
  } catch (e) {
    console.log('Error loading react application: ', e)
  }
}

if (__DEV__) {
  const mountElement = document.getElementById('root')

  let render = () => {
    const element = React.createElement(init())
    ReactDOM.render(element, mountElement)
  }

  if (__DEV__ && module.hot) {
    const renderApp = render
    const renderError = (error) => {
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
} else {
  if (window.reactRegistry) {
    window.reactRegistry.register('password-update', init) // TODO: replace string with var
  }
}
