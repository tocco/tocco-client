import {intlReducer} from 'react-intl-redux'
import {reducer as form} from 'redux-form'
import {reducer as toastr} from 'react-redux-toastr'

import entityBrowser from '../routes/entity-browser/modules/entityBrowser'
import listView from '../routes/list/modules/listView'
import detailView from '../routes/detail/modules/detailView'
import searchForm from '../routes/list/modules/searchForm'

import entityBrowserSagas from '../routes/entity-browser/modules/entityBrowser/sagas'
import listViewSagas from '../routes/list/modules/listView/sagas'
import detailViewSagas from '../routes/detail/modules/detailView/sagas'
import searchFormSagas from '../routes/list/modules/searchForm/sagas'

export default {
  intl: intlReducer,
  toastr,
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
