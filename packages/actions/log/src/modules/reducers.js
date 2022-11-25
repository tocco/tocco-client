import logReducer, {sagas as logSagas} from './log'

export default {
  log: logReducer
}

export const sagas = [logSagas]
