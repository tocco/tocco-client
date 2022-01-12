import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const setLinking = linking => state => ({...state, linking})

const ACTION_HANDLERS = {
  [actions.SET_SPECIFIC_CONFIG_ENTITY_ID]: reducerUtil.singleTransferReducer('specificConfigEntityId'),
  [actions.LINK_CREATED_SPECIFIC_CONFIG]: setLinking(true),
  [actions.UNSET_LINKING]: setLinking(false)
}

const initialState = {
  specificConfigEntityId: undefined,
  linking: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
