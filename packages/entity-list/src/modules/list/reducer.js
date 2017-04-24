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
  [actions.SET_ENTITIES]: reducers.singleTransferReducer('entities'),
  [actions.SET_COLUMN_DEFINITION]: reducers.singleTransferReducer('columnDefinition'),
  [actions.SET_LIMIT]: reducers.singleTransferReducer('limit'),
  [actions.SET_CURRENT_PAGE]: reducers.singleTransferReducer('currentPage'),
  [actions.SET_ORDER_BY]: reducers.singleTransferReducer('orderBy'),
  [actions.SET_ENTITY_COUNT]: reducers.singleTransferReducer('entityCount'),
  [actions.ADD_ENTITIES_TO_STORE]: addEntityToStore,
  [actions.CLEAR_ENTITY_STORE]: clearEntityStore,
  [actions.SET_IN_PROGRESS]: reducers.singleTransferReducer('inProgress'),
  [actions.SET_SHOW_SEARCH_FORM]: reducers.singleTransferReducer('showSearchForm'),
  [actions.SET_SEARCH_FILTERS]: reducers.singleTransferReducer('searchFilters')
}

const initialState = {
  entityModel: {},
  entities: [],
  limit: 50,
  currentPage: 1,
  orderBy: null,
  columnDefinition: [],
  entityCount: 0,
  entityStore: {},
  inProgress: false,
  showSearchForm: true,
  searchFilters: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
