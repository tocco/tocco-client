import {intlReducer} from 'react-intl-redux'
import { reducer as form } from 'redux-form'

import entityBrowser from './entityBrowser'
import listView from './listView'
import detailView from './detailView'
import searchForm from './searchForm'

import entityBrowserSagas from './entityBrowser/sagas'
import listViewSagas from './listView/sagas'
import detailViewSagas from './detailView/sagas'
import searchFormSagas from './searchForm/sagas'

export default {
  intl: intlReducer,
  form,
  entityBrowser,
  listView,
  detailView,
  searchForm
}

export const sagas = [
  entityBrowserSagas,
  listViewSagas,
  detailViewSagas,
  searchFormSagas
]
