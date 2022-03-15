import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_AVAILABLE_COLUMNS]: reducerUtil.singleTransferReducer('availableColumns'),
  [actions.SET_DEFAULT_VALUES]: reducerUtil.singleTransferReducer('defaultValues')
}

const initialState = {
  availableColumns: null,
  defaultValues: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
