import * as actions from './actions'
import {reducers} from 'tocco-util'

const showEntityDetail = (state, {payload}) => ({
  ...state,
  showDetailEntityId: payload.entityId
})

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: reducers.singleTransferReducer('formBase'),
  [actions.SET_SHOW_SEARCH_FORM]: reducers.singleTransferReducer('showSearchForm'),
  [actions.SET_DISABLE_SIMPLE_SEARCH]: reducers.singleTransferReducer('disableSimpleSearch'),
  [actions.SET_SIMPLE_SEARCH_FIELDS]: reducers.singleTransferReducer('simpleSearchFields'),
  [actions.SHOW_ENTITY_DETAIL]: showEntityDetail,
  [actions.CLOSE_ENTITY_DETAIL]: showEntityDetail,
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel')
}

const initialState = {
  entityName: '',
  formBase: '',
  showSearchForm: true,
  disableSimpleSearch: false,
  simpleSearchFields: '',
  showDetailEntityId: undefined,
  entityModel: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

