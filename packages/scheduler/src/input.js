import {
  setCalendars
} from './modules/scheduler/actions'

export const getDispatchActions = input => {
  const actions = []
  if (input.calendars) {
    actions.push(setCalendars(input.calendars))
  }

  return actions
}
