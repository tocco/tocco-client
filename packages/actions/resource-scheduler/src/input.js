import {selection} from 'tocco-app-extensions'

import {
  setHandleNotifications,
  updateRequestedCalendars,
  loadRequestedCalendars
} from './modules/resourceScheduler/actions'

export const getDispatchActions = (input, handleNotifications) => {
  const actions = []

  if (input.actionProperties?.calendarType) {
    if (input.selection?.type === selection.selectionTypes.ID) {
      actions.push(updateRequestedCalendars(input.actionProperties.calendarType, input.selection.ids))
    } else if (input.selection?.type === selection.selectionTypes.QUERY) {
      actions.push(loadRequestedCalendars(input.actionProperties.calendarType, input.selection))
    }
  }

  actions.push(setHandleNotifications(handleNotifications))
  return actions
}
