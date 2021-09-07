import {v4 as uuid} from 'uuid'

import * as actions from './actions'

const handleReceiveEntry = (state, {payload}) => ({
  ...state,
  entries: [{
    ...payload.data,
    key: uuid()
  },
  ...state.entries]
})

const ACTION_HANDLERS = {
  [actions.RECEIVE_ENTRY]: handleReceiveEntry
}

const initialState = {
  entries: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
