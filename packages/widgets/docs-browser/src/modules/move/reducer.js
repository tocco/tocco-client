import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialize = (state, {payload: {selection, onSuccess, onError}}) => ({
  ...state,
  input: {
    selection,
    onSuccess,
    onError
  }
})

const close = () => ({
  ...initialState
})

const ACTION_HANDLERS = {
  [actions.INITIALIZE]: initialize,
  [actions.SET_WAITING]: reducerUtil.singleTransferReducer('isWaiting'),
  [actions.CLOSE]: close
}

const initialState = {
  isWaiting: false,
  input: {
    selection: null,
    onSuccess: null,
    onError: null
  }
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
