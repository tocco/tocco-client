import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const ACTION_HANDLERS = {
  [actions.SET_FORM_DEFINITION]: singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_RECORD]: singleTransferReducer('record')
}

const initialState = {
  entityName: '',
  formDefinition: [],
  record: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

