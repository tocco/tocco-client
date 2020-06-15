import {reducer as reducerUtil} from 'tocco-util'

import {SET_ENTITY_KEY} from './actions'

const initialState = {
  entityKey: null
}

const ACTION_HANDLERS = {
  [SET_ENTITY_KEY]: reducerUtil.singleTransferReducer('entityKey')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
