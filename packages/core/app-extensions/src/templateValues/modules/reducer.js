import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducerUtil.singleTransferReducer('initialized'),
  [actions.SET_FORM]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_FIELD_DEFINITIONS]: reducerUtil.singleTransferReducer('fieldDefinitions'),
  [actions.SET_TEMPLATE_OPTIONS]: reducerUtil.singleTransferReducer('templateOptions'),
  [actions.SET_TEMPLATE_VALUES]: reducerUtil.mappingTransferReducer('template', 'selectedTemplate')
}

const initialState = {
  formDefinition: null,
  fieldDefinitions: null,
  templateOptions: [],
  selectedTemplate: null,
  initialized: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
