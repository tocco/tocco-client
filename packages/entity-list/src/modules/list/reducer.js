import {reducer as reducerUtil} from 'tocco-util'
import _uniq from 'lodash/uniq'

import * as actions from './actions'

const addEntityToStore = (state, {payload}) => ({
  ...state,
  entityStore: {
    ...state.entityStore,
    [payload.page]: payload.entities
  }
})

const clearEntityStore = state => ({
  ...state,
  entityStore: {}
})

const comparator = (a, b) => a - b

const setSelection = (state, {payload}) => ({
  ...state,
  selection: _uniq(payload.selection).sort(comparator)
})

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducerUtil.singleTransferReducer('initialized'),
  [actions.SET_ENTITIES]: reducerUtil.singleTransferReducer('entities'),
  [actions.SET_FORM_DEFINITION]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_MODEL]: reducerUtil.singleTransferReducer('entityModel'),
  [actions.SET_LIMIT]: reducerUtil.singleTransferReducer('limit'),
  [actions.SET_CURRENT_PAGE]: reducerUtil.singleTransferReducer('currentPage'),
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting'),
  [actions.SET_ENTITY_COUNT]: reducerUtil.singleTransferReducer('entityCount'),
  [actions.ADD_ENTITIES_TO_STORE]: addEntityToStore,
  [actions.CLEAR_ENTITY_STORE]: clearEntityStore,
  [actions.SET_IN_PROGRESS]: reducerUtil.singleTransferReducer('inProgress'),
  [actions.SET_SHOW_SEARCH_FORM]: reducerUtil.singleTransferReducer('showSearchForm'),
  [actions.SET_SEARCH_FILTERS]: reducerUtil.singleTransferReducer('searchFilters'),
  [actions.SET_CREATE_PERMISSION]: reducerUtil.singleTransferReducer('createPermission'),
  [actions.SET_SELECTABLE]: reducerUtil.singleTransferReducer('selectable'),
  [actions.SET_ENDPOINT]: reducerUtil.singleTransferReducer('endpoint'),
  [actions.SET_SELECTION]: setSelection
}

const initialState = {
  initialized: false,
  entityModel: {},
  entities: [],
  limit: 10,
  currentPage: 1,
  sorting: null,
  formDefinition: null,
  entityCount: 0,
  entityStore: {},
  inProgress: false,
  showSearchForm: true,
  searchFilters: [],
  createPermission: false,
  selectable: false,
  selection: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
