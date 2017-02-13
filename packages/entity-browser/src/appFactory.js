import React from 'react'
import {Provider} from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import {storeFactory, externalEvents, intl} from 'tocco-util'
import {addLocaleData} from 'react-intl'
import {IntlProvider} from 'react-intl-redux'
import {LoadMask} from 'tocco-ui'

import {setEntityName, setFormBase, setShowSearchForm, setDisableSimpleSearch,
        setSimpleSearchFields} from './modules/entityBrowser/actions'
import {setLimit} from './modules/listView/actions'

import EntityBrowserContainer from './containers/EntityBrowserContainer'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

import reducers, {sagas} from './modules/reducers'

import '!style-loader!css-loader!react-redux-toastr/lib/css/react-redux-toastr.css'

export default (id, input = {}, events, publicPath) => {
  const dispatches = validateInput(input)

  return factory('entity-browser', input, events, publicPath, 'entity-browser', reducers, dispatches)
}

const factory = (id, input = {}, events, publicPath, resourcePrefix, reducers, dispatches) => {
  try {
    if (publicPath) {
      /* eslint camelcase: 0 */
      __webpack_public_path__ = publicPath
    }

    const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

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

    dispatches.forEach(f => {
      store.dispatch(f)
    })

    addLocaleData([...de, ...en, ...fr, ...it])
    const locale = input ? input.locale : null
    const initIntlPromise = intl.initIntl(store, resourcePrefix, locale)

    const toastrOptions = {
      newestOnTop: false,
      preventDuplicates: true,
      position: 'top-right',
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
      progressBar: true
    }
    const App = () => (
      <Provider store={store}>
        <LoadMask promises={[initIntlPromise]}>
          <IntlProvider>
            <div>
              <ReduxToastr {...toastrOptions}/>
              <EntityBrowserContainer/>
            </div>
          </IntlProvider>
        </LoadMask>
      </Provider>
    )

    return {
      renderComponent: App,
      methods: {
        setLocale: locale => intl.setLocale(store, resourcePrefix, locale)
      }
    }
  } catch (e) {
    console.log('Error loading react application: ', e)
  }
}

const validateInput = input => {
  const dispatches = []

  inputsFields.forEach(f => {
    if (input.hasOwnProperty(f.key)) {
      dispatches.push(f.action(input[f.key]))
    } else if (f.mandatory) {
      console.error(`EntityBrowser: Mandatory field '${f.key}' not set in input`)
    }
  })
  return dispatches
}

const inputsFields = [
  {
    key: 'entityName',
    action: setEntityName,
    mandatory: true
  },
  {
    key: 'formBase',
    action: setFormBase,
    mandatory: false
  },
  {
    key: 'limit',
    action: setLimit,
    mandatory: false
  },
  {
    key: 'showSearchForm',
    action: setShowSearchForm,
    mandatory: false
  },
  {
    key: 'disableSimpleSearch',
    action: setDisableSimpleSearch,
    mandatory: false
  },
  {
    key: 'simpleSearchFields',
    action: setSimpleSearchFields,
    mandatory: false
  }
]
