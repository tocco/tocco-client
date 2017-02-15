import {intlReducer} from 'react-intl-redux'
import {Reducers as gridReducers} from 'react-redux-grid'
import {reducer as form} from 'redux-form'
import {reducer as toastr} from 'react-redux-toastr'

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
  toastr,
  form,
  entityBrowser,
  listView,
  detailView,
  searchForm,
  ...gridReducers
}

export const sagas = [
  entityBrowserSagas,
  listViewSagas,
  detailViewSagas,
  searchFormSagas
]
