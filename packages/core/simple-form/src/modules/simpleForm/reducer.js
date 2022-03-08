import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_FIELD_DEFINITIONS]: reducerUtil.singleTransferReducer('fieldDefinitions')
}

const initialState = {
  fieldDefinitions: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
