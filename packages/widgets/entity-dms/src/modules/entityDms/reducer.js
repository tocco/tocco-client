import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_FOLDER_KEY]: reducerUtil.singleTransferReducer('folderKey')
}

const initialState = {
  folderKey: undefined
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
