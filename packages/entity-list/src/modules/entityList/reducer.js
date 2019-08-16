import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducerUtil.singleTransferReducer('initialized'),
  [actions.SET_ENTITY_NAME]: reducerUtil.singleTransferReducer('entityName'),
  [actions.SET_ENTITY_MODEL]: reducerUtil.singleTransferReducer('entityModel'),
  [actions.SET_SHOW_SEARCH_FORM]: reducerUtil.singleTransferReducer('showSearchForm'),
  [actions.SET_PARENT]: reducerUtil.singleTransferReducer('parent')
}

const initialState = {
  initialized: false,
  entityName: '',
  entityModel: {},
  showSearchForm: false,
  parent: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
