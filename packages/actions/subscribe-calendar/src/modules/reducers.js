import subscribeCalendarReducer, {sagas as subscribeCalendarSagas} from './subscribeCalendar'

export default {
  subscribeCalendar: subscribeCalendarReducer
}

export const sagas = [subscribeCalendarSagas]
