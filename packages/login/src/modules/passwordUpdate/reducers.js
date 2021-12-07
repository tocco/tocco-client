import dialog from './dialog'
import password, {sagas as passwordSagas} from './password'
import mainSagas from './sagas'
import validationRules, {sagas as validationRulesSagas} from './validationRules'

export default {
  dialog,
  password,
  validationRules
}

export const sagas = [mainSagas, passwordSagas, validationRulesSagas]
