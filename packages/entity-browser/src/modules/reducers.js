import {reducer as form} from 'redux-form'
import {reducer as toastr} from 'react-redux-toastr'

import entityBrowser from '../routes/entity-browser/modules'
import detail from '../routes/detail/modules'
import searchForm from '../routes/list/modules/searchForm'

import entityBrowserSagas from '../routes/entity-browser/modules/sagas'
import detailViewSagas from '../routes/detail/modules/sagas'
import searchFormSagas from '../routes/list/modules/searchForm/sagas'

export default {
  toastr,
  form,
  entityBrowser,
  detail,
  searchForm
}

export const sagas = [
  entityBrowserSagas,
  detailViewSagas,
  searchFormSagas
]
