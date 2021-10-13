import dashboardReducer, {sagas as dashboardSagas} from './dashboard'

export default {
  dashboard: dashboardReducer
}

export const sagas = [
  dashboardSagas
]
