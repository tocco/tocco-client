import {reducer as reducerUtil} from 'tocco-util'

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
  [actions.SET_FORM_SELECTABLE]: reducerUtil.singleTransferReducer('formSelectable'),
  [actions.SET_ENDPOINT]: reducerUtil.singleTransferReducer('endpoint'),
  [actions.SET_SHOW_LINK]: reducerUtil.singleTransferReducer('showLink')

}

const initialState = {
  initialized: false,
  entityModel: {},
  entities: [],
  limit: 10,
  currentPage: 1,
  sorting: null,
  formDefinition: null,
  entityCount: null,
  entityStore: {},
  inProgress: false,
  showSearchForm: true,
  searchFilters: [],
  createPermission: false,
  formSelectable: false,
  showLink: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
