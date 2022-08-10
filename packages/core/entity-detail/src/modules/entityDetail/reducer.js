import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_FORM_DEFINITION]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY]: reducerUtil.singleTransferReducer('entity'),
  [actions.SET_LAST_SAVE]: reducerUtil.singleTransferReducer('lastSave'),
  [actions.SET_ENTITY_MODEL]: reducerUtil.singleTransferReducer('entityModel'),
  [actions.SET_TOUCHED]: reducerUtil.singleTransferReducer('touched'),
  [actions.SET_FIELD_DEFINITIONS]: reducerUtil.singleTransferReducer('fieldDefinitions'),
  [actions.SET_MARKED]: reducerUtil.singleTransferReducer('marked')
}

const initialState = {
  formDefinition: {},
  entity: {},
  entityModel: {},
  touched: false,
  fieldDefinitions: [],
  marked: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
