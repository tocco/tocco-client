import session, {sagas as sessionSagas} from './session'
import path, {sagas as pathSagas} from './path'

export default {
  session,
  path
}

export const sagas = [
  sessionSagas,
  pathSagas
]
