import formReducer, {sagas as formSagas} from './simpleForm'
import {reducer as form} from 'redux-form'

export default {
  simpleForm: formReducer,
  form
}

export const sagas = [
  formSagas
]
