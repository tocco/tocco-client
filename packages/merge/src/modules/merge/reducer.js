import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_SELECTION]: reducerUtil.singleTransferReducer('selection'),
  [actions.SET_SOURCE_DATA]: reducerUtil.singleTransferReducer('sourceData'),
  [actions.SET_MERGE_RESPONSE]: reducerUtil.singleTransferReducer('mergeResponse')
}

const initialState = {
  selection: null,
  sourceData: null,
  mergeResponse: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
