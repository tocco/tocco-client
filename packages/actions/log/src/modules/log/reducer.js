import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_DATA]: reducerUtil.singleTransferReducer('data'),
  [actions.SET_FILECONTENT]: reducerUtil.singleTransferReducer('fileContent')
}

const initialState = {
  data: undefined,
  fileContent: undefined
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
