import {reducer as form} from 'redux-form'

import formReducer, {sagas as formSagas} from './simpleForm'

export default {
  simpleForm: formReducer,
  form
}

export const sagas = [
  formSagas
]
