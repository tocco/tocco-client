import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import {Intl} from 'tocco-util'
import {LoadMask} from 'tocco-ui'
import createStore from './store/createStore'
import PasswordUpdateDialog from './containers/PasswordUpdateDialogContainer'
import {registerEvents} from './utils/ExternalEvents'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

const init = (id, input, externalEvents) => {
  var initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

  if (__DEV__) {
    input = require('./dev_input.json')
  }

  if (input) {
    initialState.input = input
  }

  if (externalEvents) registerEvents(externalEvents)

  const store = createStore(initialState)

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
}

if (__DEV__) {
  const mountElement = document.getElementById('root')

  let render = () => {
    const element = React.createElement(init())
    ReactDOM.render(element, mountElement)
  }

  // Enable HMR and catch runtime errors in RedBox
  // This code is excluded from production bundle
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
