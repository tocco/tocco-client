import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_AVAILABLE_COLUMNS]: reducerUtil.singleTransferReducer('availableColumns'),
  [actions.SET_DEFAULT_COLUMNS]: reducerUtil.singleTransferReducer('defaultColumns'),
  [actions.SET_TEMPLATE_COLUMNS]: reducerUtil.singleTransferReducer('templateColumns'),
  [actions.SET_DEFAULT_VALUES]: reducerUtil.singleTransferReducer('defaultValues')
}

const initialState = {
  availableColumns: null,
  defaultColumns: null,
  templateColumns: null,
  defaultValues: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
