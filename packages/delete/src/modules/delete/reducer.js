import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_DIALOG_INFO]: reducerUtil.singleTransferReducer('dialogInfo'),
  [actions.SET_DELETING_IN_PROGRESS]: reducerUtil.singleTransferReducer('deletingInProgress')
}

const initialState = {
  dialogInfo: null,
  deletingInProgress: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
