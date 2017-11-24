import * as actions from './actions'
import {reducers} from 'tocco-util'

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

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducers.singleTransferReducer('initialized'),
  [actions.SET_ENTITIES]: reducers.singleTransferReducer('entities'),
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel'),
  [actions.SET_LIMIT]: reducers.singleTransferReducer('limit'),
  [actions.SET_CURRENT_PAGE]: reducers.singleTransferReducer('currentPage'),
  [actions.SET_SORTING]: reducers.singleTransferReducer('sorting'),
  [actions.SET_ENTITY_COUNT]: reducers.singleTransferReducer('entityCount'),
  [actions.ADD_ENTITIES_TO_STORE]: addEntityToStore,
  [actions.CLEAR_ENTITY_STORE]: clearEntityStore,
  [actions.SET_IN_PROGRESS]: reducers.singleTransferReducer('inProgress'),
  [actions.SET_SHOW_SEARCH_FORM]: reducers.singleTransferReducer('showSearchForm'),
  [actions.SET_SEARCH_FILTERS]: reducers.singleTransferReducer('searchFilters'),
  [actions.SET_CREATE_PERMISSION]: reducers.singleTransferReducer('createPermission')
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
  createPermission: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
