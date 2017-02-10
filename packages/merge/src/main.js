import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {storeFactory, externalEvents, intl} from 'tocco-util'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import {LoadMask} from 'tocco-ui'

import MergeWizardContainer from './containers/MergeWizardContainer'
import dispatchInput from './utils/DispatchInput'
import reducers, {sagas} from './modules/reducers'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

const init = (id, input, events, publicPath) => {
  try {
    if (publicPath) {
      /* eslint camelcase: 0 */
      __webpack_public_path__ = publicPath
    }

    const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}
    if (__DEV__) {
      input = require('./dev/input.json')
    }

    if (input) {
      initialState.input = input
    }

    if (events) externalEvents.registerEvents(events)

    const store = storeFactory.createStore(initialState, reducers, sagas)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        let reducers = require('./modules/reducers').default
        storeFactory.hotReloadReducers(store, reducers)
      })
    }

    dispatchInput(store)

    addLocaleData([...de, ...en, ...fr, ...it])
    const initIntlPromise = intl.initIntl(store, 'merge')

    const App = () => (
      <Provider store={store}>
        <LoadMask promises={[initIntlPromise]}>
          <IntlProvider className="tocco-merge">
            <MergeWizardContainer/>
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
  const fetchMock = require('fetch-mock')
  const setupFetchMocks = require('./dev/fetchMocks')

  setupFetchMocks(fetchMock)

  const mountElement = document.getElementById('root')

  let render = () => {
    const element = React.createElement(init())
    ReactDOM.render(element, mountElement)
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
} else {
  if (window.reactRegistry) {
    window.reactRegistry.register('merge', init) // git TODO: replace string with var
  }
}
