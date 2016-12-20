import {intlReducer} from 'react-intl-redux'
import entityBrowser from './entityBrowser'
import searchForm from './searchForm'

import entityBrowserSagas from './entityBrowser/sagas'
import searchFormSagas from './searchForm/sagas'

export default {
  intl: intlReducer,
  entityBrowser,
  searchForm
}

export const sagas = [
  entityBrowserSagas,
  searchFormSagas
]
