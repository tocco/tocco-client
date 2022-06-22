import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialState = {
  formDefinition: null,
  formValid: false
}

const ACTION_HANDLERS = {
  [actions.SET_FORM_DEFINITION]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_FORM_VALID]: reducerUtil.singleTransferReducer('formValid')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
