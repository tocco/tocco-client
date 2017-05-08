import * as actions from './actions'
import {reducers} from 'tocco-util'

const ACTION_HANDLERS = {
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY]: reducers.singleTransferReducer('entity'),
  [actions.SET_LAST_SAVE]: reducers.singleTransferReducer('lastSave'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel')
}

const initialState = {
  formDefinition: {},
  entity: {},
  entityModel: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
