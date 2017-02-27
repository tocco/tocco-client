import {intlReducer} from 'react-intl-redux'
import {reducer as form} from 'redux-form'
import {reducer as toastr} from 'react-redux-toastr'

import entityBrowser from '../routes/entity-browser/modules'
import list from '../routes/list/modules'
import detail from '../routes/detail/modules'
import searchForm from '../routes/list/modules/searchForm'

import entityBrowserSagas from '../routes/entity-browser/modules/sagas'
import listViewSagas from '../routes/list/modules/sagas'
import detailViewSagas from '../routes/detail/modules/sagas'
import searchFormSagas from '../routes/list/modules/searchForm/sagas'

export default {
  intl: intlReducer,
  toastr,
  form,
  entityBrowser,
  list,
  detail,
  searchForm
}

export const sagas = [
  entityBrowserSagas,
  listViewSagas,
  detailViewSagas,
  searchFormSagas
]
