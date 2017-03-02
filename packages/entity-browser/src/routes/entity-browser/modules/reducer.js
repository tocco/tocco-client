import * as actions from './actions'
import {reducers} from 'tocco-util'

const ACTION_HANDLERS = {
  [actions.INITIALIZED]: reducers.singleTransferReducer('initialized'),
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: reducers.singleTransferReducer('formBase'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel')
}

const initialState = {
  initialized: false,
  entityName: '',
  formBase: '',
  entityModel: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

