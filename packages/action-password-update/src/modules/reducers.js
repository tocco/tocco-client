import password, { sagas as passwordSagas } from './password/'
import validationRules, { sagas as validationRulesSagas } from './validationRules/'
import {intlReducer} from 'react-intl-redux'

export default {
  password,
  validationRules,
  intl: intlReducer
}

export const sagas = [
  passwordSagas,
  validationRulesSagas
]
