import * as actions from './actions'
import {reducers} from 'tocco-util'

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducers.singleTransferReducer('initialized'),
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel'),
  [actions.SET_SHOW_SEARCH_FORM]: reducers.singleTransferReducer('showSearchForm'),
  [actions.SET_SHOW_CREATE_BUTTON]: reducers.singleTransferReducer('showCreateButton')
}

const initialState = {
  initialized: false,
  entityName: '',
  entityModel: {},
  showSearchForm: false,
  showCreateButton: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
