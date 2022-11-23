import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_DATA]: reducerUtil.singleTransferReducer('data'),
  [actions.IS_LOADING]: reducerUtil.singleTransferReducer('isLoading')
}

const initialState = {
  data: undefined,
  isLoading: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
