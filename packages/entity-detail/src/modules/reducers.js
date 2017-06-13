import entityDetailReducer, {sagas as entityDetailSagas} from './entityDetail'
import {reducer as form} from 'redux-form'

export default {
  entityDetail: entityDetailReducer,
  form
}

export const sagas = [
  entityDetailSagas
]
