import {intlReducer} from 'react-intl-redux'
import entityBrowser from './entityBrowser'
import listView from './listView'
import searchForm from './searchForm'

import entityBrowserSagas from './entityBrowser/sagas'
import listViewSagas from './listView/sagas'
import searchFormSagas from './searchForm/sagas'

export default {
  intl: intlReducer,
  entityBrowser,
  listView,
  searchForm
}

export const sagas = [
  entityBrowserSagas,
  listViewSagas,
  searchFormSagas
]
