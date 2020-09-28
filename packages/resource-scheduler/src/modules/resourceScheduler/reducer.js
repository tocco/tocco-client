import {reducer as reducerUtil} from 'tocco-util'
import _omit from 'lodash/omit'

import * as actions from './actions'

const updateRequestedCalendars = (state, {payload: {ids, calendarType}}) => ({
  ...state,
  requestedCalendars: {
    ...(_omit(state.requestedCalendars, [calendarType])),
    ...(ids.length > 0 ? {[calendarType]: ids} : {})
  }
})

const removeRequestedCalendar = (state, {payload}) => {
  const {id, entityModel} = payload

  const typesToRemove = state.calendarTypes.filter(type => type.targetEntity === entityModel).map(type => type.name)
  const adjustedTypeKeys = typesToRemove
    .reduce((acc, calendarType) => {
      const arr = state.requestedCalendars[calendarType]
      if (!arr) {
        return acc
      }

      const index = arr.indexOf(id)
      if (index < 0) {
        return acc
      }

      const newKeys = [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
      ]

      if (newKeys.length > 0) {
        return {
          ...acc,
          [calendarType]: newKeys
        }
      } else {
        return acc
      }
    }, {})

  return {
    ...state,
    requestedCalendars: {
      ...(_omit(state.requestedCalendars, typesToRemove)),
      ...adjustedTypeKeys
    }
  }
}

const removeAllCalendars = state => {
  return {
    ...state,
    requestedCalendars: {},
    calendars: []
  }
}

const ACTION_HANDLERS = {
  [actions.SET_CALENDAR_TYPES]: reducerUtil.singleTransferReducer('calendarTypes'),
  [actions.SET_CALENDARS]: reducerUtil.singleTransferReducer('calendars'),
  [actions.SET_DATE_RANGE]: reducerUtil.singleTransferReducer('dateRange'),
  [actions.UPDATE_REQUESTED_CALENDARS]: updateRequestedCalendars,
  [actions.REMOVE_REQUESTED_CALENDAR]: removeRequestedCalendar,
  [actions.REMOVE_ALL_CALENDARS]: removeAllCalendars
}

const initialState = {
  calendarTypes: [],
  requestedCalendars: {},
  calendars: [],
  dateRange: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
