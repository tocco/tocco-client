import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: reducerUtil.singleTransferReducer('entityName'),
  [actions.SET_FORM_NAME]: reducerUtil.singleTransferReducer('formName'),
  [actions.SET_ENTITY_ID]: reducerUtil.singleTransferReducer('entityId'),
  [actions.SET_MODE]: reducerUtil.singleTransferReducer('mode'),
  [actions.SET_FORM_DEFINITION]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY]: reducerUtil.singleTransferReducer('entity'),
  [actions.SET_LAST_SAVE]: reducerUtil.singleTransferReducer('lastSave'),
  [actions.SET_ENTITY_MODEL]: reducerUtil.singleTransferReducer('entityModel'),
  [actions.SET_TOUCHED]: reducerUtil.singleTransferReducer('touched'),
  [actions.SET_APP_ID]: reducerUtil.singleTransferReducer('appId'),
  [actions.SET_DEFAULT_VALUES]: reducerUtil.singleTransferReducer('defaultValues')
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
  defaultValues: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
