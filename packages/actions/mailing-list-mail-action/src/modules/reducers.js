import {reducer as form} from 'redux-form'

import mailActionReducer from './mailAction/reducer'
import mailActionSagas from './mailAction/sagas'

export default {
  mailAction: mailActionReducer,
  form
}

export const sagas = [mailActionSagas]
