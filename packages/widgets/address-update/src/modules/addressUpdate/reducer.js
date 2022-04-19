import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_FORM_NAME]: reducerUtil.singleTransferReducer('formName'),
  [actions.SET_FORM_DEFINITION]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY]: reducerUtil.singleTransferReducer('entity'),
  [actions.SET_TOUCHED]: reducerUtil.singleTransferReducer('touched'),
  [actions.SET_FIELD_DEFINITIONS]: reducerUtil.singleTransferReducer('fieldDefinitions')
}

const initialState = {
  formName: '',
  formDefinition: {},
  entity: {},
  touched: false,
  fieldDefinitions: [],
  mode: 'update'
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
