import * as actions from './actions'
import {reducers} from 'tocco-util'

const removeEvents = state => ({
  ...state,
  calendars: state.calendars.map(calendar => ({...calendar, events: []}))
})

const ACTION_HANDLERS = {
  [actions.SET_CALENDARS]: reducers.singleTransferReducer('calendars'),
  [actions.SET_IS_LOADING]: reducers.singleTransferReducer('isLoading'),
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
