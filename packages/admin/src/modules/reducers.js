import session, {sagas as sessionSagas} from './session'
import navigation, {sagas as navigationSagas} from './navigation'

export default {
  session,
  navigation
}

export const sagas = [
  sessionSagas,
  navigationSagas
]
