import {action} from 'tocco-util'

import {setCalendars} from './modules/scheduler/actions'

export const getDispatchActions = input => action.getDispatchActions(input, actionSettings)

const actionSettings = [
  {
    name: 'calendars',
    action: setCalendars,
    argsFactory: input => [input.calendars]
  }
]
