import mainSagas from './sagas'
import password, {sagas as passwordSagas} from './password'
import validationRules, {sagas as validationRulesSagas} from './validationRules'

export default {
  password,
  validationRules
}

export const sagas = [
  mainSagas,
  passwordSagas,
  validationRulesSagas
]
