import {setHandleNotifications, updateRequestedCalendars} from './modules/resourceScheduler/actions'

export const getDispatchActions = (input, handleNotifications) => {
  const actions = []

  if (input.selection?.type === 'ID' && input.actionProperties?.calendarType) {
    actions.push(updateRequestedCalendars(input.actionProperties.calendarType, input.selection.ids))
  }

  actions.push(setHandleNotifications(handleNotifications))
  return actions
}
