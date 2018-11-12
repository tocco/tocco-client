import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const removeEvents = state => ({
  ...state,
  calendars: state.calendars.map(calendar => ({...calendar, events: []}))
})

const ACTION_HANDLERS = {
  [actions.SET_CALENDARS]: reducerUtil.singleTransferReducer('calendars'),
  [actions.SET_IS_LOADING]: reducerUtil.singleTransferReducer('isLoading'),
  [actions.REMOVE_EVENTS]: removeEvents
}

const initialState = {
  calendars: [],
  isLoading: true
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
