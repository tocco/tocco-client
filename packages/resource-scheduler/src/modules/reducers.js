import resourceSchedulerReducer, {sagas as resourceSchedulerSagas} from './resourceScheduler'

export default {
  resourceScheduler: resourceSchedulerReducer
}

export const sagas = [
  resourceSchedulerSagas
]
