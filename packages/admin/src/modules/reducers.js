import session, {sagas as sessionSagas} from './session'
import navigation, {sagas as navigationSagas} from './navigation'
import preferences, {sagas as preferencesSagas} from './preferences'

export default {
  session,
  navigation,
  preferences
}

export const sagas = [
  sessionSagas,
  navigationSagas,
  preferencesSagas
]
