import entityDetailReducer, {sagas as entityDetailSagas} from './entityDetail'
import {reducer as form} from 'redux-form'
import {reducer as toastr} from 'react-redux-toastr'

export default {
  entityDetail: entityDetailReducer,
  form,
  toastr
}

export const sagas = [
  entityDetailSagas
]
