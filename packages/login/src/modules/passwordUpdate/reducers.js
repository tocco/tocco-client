import mainSagas from './sagas'
import password, {sagas as passwordSagas} from './password'
import dialog from './dialog'
import validationRules, {sagas as validationRulesSagas} from './validationRules'

export default {
  dialog,
  password,
  validationRules
}

export const sagas = [
  mainSagas,
  passwordSagas,
  validationRulesSagas
]
