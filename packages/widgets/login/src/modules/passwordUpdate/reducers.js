import dialog, {sagas as dialogSagas} from './dialog'
import password, {sagas as passwordSagas} from './password'
import mainSagas from './sagas'
import validationRules, {sagas as validationRulesSagas} from './validationRules'

export default {
  dialog,
  password,
  validationRules
}

export const sagas = [dialogSagas, mainSagas, passwordSagas, validationRulesSagas]
