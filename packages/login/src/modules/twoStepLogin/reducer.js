import * as actions from './actions'

function setRequestedCode(state, {payload}) {
  const {requestedCode} = payload
  return {
    ...state,
    requestedCode
  }
}

const ACTION_HANDLERS = {
  [actions.SET_REQUESTED_CODE]: setRequestedCode
}

const initialState = {
  requestedCode: ''
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
