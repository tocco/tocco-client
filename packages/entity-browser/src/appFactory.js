import React from 'react'
import {Provider} from 'react-redux'
import {StoreFactory, ExternalEvents, Intl} from 'tocco-util'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import {LoadMask} from 'tocco-ui'

import {setEntityName} from './modules/entityBrowser/actions'

import EntityBrowserContainer from './containers/EntityBrowserContainer'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

import reducers, {sagas} from './modules/reducers'

export default (id, input = {}, externalEvents, publicPath) => {
  const dispatches = [setEntityName(input.entityName)]
  return factory('entity-browser', input, externalEvents, publicPath, 'entity-browser', reducers, dispatches)
}

const factory = (id, input = {}, externalEvents, publicPath, resourcePrefix, reducers, dispatches) => {
  try {
    if (publicPath) {
      /* eslint camelcase: 0 */
      __webpack_public_path__ = publicPath
    }

    const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

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

    dispatches.forEach(f => {
      store.dispatch(f)
    })

    addLocaleData([...de, ...en, ...fr, ...it])
    const locale = input ? input.locale : null
    const initIntlPromise = Intl.initIntl(store, resourcePrefix, locale)

    const App = () => (
      <Provider store={store}>
        <LoadMask promises={[initIntlPromise]}>
          <IntlProvider>
            <EntityBrowserContainer/>
          </IntlProvider>
        </LoadMask>
      </Provider>
    )

    return {
      renderComponent: App,
      methods: {
        setLocale: locale => Intl.setLocale(store, resourcePrefix, locale)
      }
    }
  } catch (e) {
    console.log('Error loading react application: ', e)
  }
}
