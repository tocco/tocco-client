import {reducers} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_FORM_NAME]: reducers.singleTransferReducer('formName'),
  [actions.SET_ENTITY_ID]: reducers.singleTransferReducer('entityId'),
  [actions.SET_MODE]: reducers.singleTransferReducer('mode'),
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY]: reducers.singleTransferReducer('entity'),
  [actions.SET_LAST_SAVE]: reducers.singleTransferReducer('lastSave'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel'),
  [actions.SET_TOUCHED]: reducers.singleTransferReducer('touched'),
  [actions.SET_SHOW_SUB_GRIDS_CREATE_BUTTON]: reducers.singleTransferReducer('showSubGridCreateButton'),
  [actions.SET_APP_ID]: reducers.singleTransferReducer('appId')
}

const initialState = {
  appId: '',
  entityName: '',
  formName: '',
  mode: 'update',
  formDefinition: {},
  entity: {},
  entityModel: {},
  touched: false,
  showSubGridCreateButton: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
