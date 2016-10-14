import React from 'react'
import {Provider} from 'react-redux'
import {StoreFactory, ExternalEvents, Intl} from 'tocco-util'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import {LoadMask} from 'tocco-ui'

import LoginContainer from './containers/LoginContainer'
import PasswordUpdateDialog from './containers/PasswordUpdateDialogContainer'
import reducers, {sagas} from './modules/reducers'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

export const loginFactory = (id, input, externalEvents) => (
  factory('loginForm', 'action.login', id, input, externalEvents)
)

export const passwordUpdateFactory = (id, input, externalEvents) => (
  factory('passwordUpdate', 'action.passwordUpdate', id, input, externalEvents)
)

const factory = (component, moduleName, id, input, externalEvents) => {
  try {
    var initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}
    if (__DEV__) {
      input = require('./dev/input.json')
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

    var showTitle = input ? input.showTitle : false

    var content
    if (component === 'passwordUpdate') {
      content = <PasswordUpdateDialog showTitle={showTitle}/>
    } else {
      content = <LoginContainer showTitle={showTitle}/>
    }

    const App = () => (
      <Provider store={store}>
        <LoadMask promises={[initIntlPromise]}>
          <IntlProvider>
            {content}
          </IntlProvider>
        </LoadMask>
      </Provider>
    )
    return App
  } catch (e) {
    console.log('Error loading react application: ', e)
  }
}
