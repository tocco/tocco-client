import schedulerReducer, {sagas as schedulerSagas} from './scheduler'

export default {
  scheduler: schedulerReducer
}

export const sagas = [
  schedulerSagas
]
