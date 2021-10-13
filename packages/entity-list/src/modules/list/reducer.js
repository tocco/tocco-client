import {reducer as reducerUtil} from 'tocco-util'
import _get from 'lodash/get'

import * as actions from './actions'

const addEntityToStore = (state, {payload}) => ({
  ...state,
  entityStore: {
    ...state.entityStore,
    [payload.page]: payload.entities
  }
})

const setLazyData = (state, {payload: {type, id, values}}) => ({
  ...state,
  lazyData: {
    ...state.lazyData,
    [type]: {
      ...state.lazyData[type],
      [id]: {..._get(state, ['lazyData', type, id], {}), ...values}
    }
  }
})

const clearEntityStore = state => ({
  ...state,
  entityStore: {}
})

const defaultOrder = 'asc'
const getOpposite = order => order === 'asc' ? 'desc' : 'asc'
const setSortingInteractive = (state, {payload: {field, add}}) => {
  if (!add) {
    const currentSorting = state.sorting
    const order = (currentSorting.length > 0 && currentSorting[0].field === field
      ? getOpposite(currentSorting[0].order)
      : defaultOrder)
    return {
      ...state,
      sorting: [{field, order}]
    }
  } else {
    const contains = state.sorting.filter(s => s.field === field)
    const order = contains.length > 0 ? getOpposite(contains[0].order) : defaultOrder

    return {
      ...state,
      sorting: [...state.sorting.filter(s => s.field !== field), {field, order}]
    }
  }
}

const ACTION_HANDLERS = {
  [actions.SET_ENTITIES]: reducerUtil.singleTransferReducer('entities'),
  [actions.SET_FORM_DEFINITION]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_MODEL]: reducerUtil.singleTransferReducer('entityModel'),
  [actions.SET_LIMIT]: reducerUtil.singleTransferReducer('limit'),
  [actions.SET_SCOPE]: reducerUtil.singleTransferReducer('scope'),
  [actions.SET_CURRENT_PAGE]: reducerUtil.singleTransferReducer('currentPage'),
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting'),
  [actions.SET_SORTING_INTERACTIVE]: setSortingInteractive,
  [actions.SET_ENTITY_COUNT]: reducerUtil.singleTransferReducer('entityCount'),
  [actions.ADD_ENTITIES_TO_STORE]: addEntityToStore,
  [actions.SET_LAZY_DATA]: setLazyData,
  [actions.CLEAR_ENTITY_STORE]: clearEntityStore,
  [actions.SET_IN_PROGRESS]: reducerUtil.singleTransferReducer('inProgress'),
  [actions.SET_SHOW_SEARCH_FORM]: reducerUtil.singleTransferReducer('showSearchForm'),
  [actions.SET_SEARCH_FILTERS]: reducerUtil.singleTransferReducer('searchFilters'),
  [actions.SET_FORM_SELECTABLE]: reducerUtil.singleTransferReducer('formSelectable'),
  [actions.SET_FORM_CLICKABLE]: reducerUtil.singleTransferReducer('formClickable'),
  [actions.SET_ENDPOINT]: reducerUtil.singleTransferReducer('endpoint'),
  [actions.SET_SEARCH_ENDPOINT]: reducerUtil.singleTransferReducer('searchEndpoint'),
  [actions.SET_CONSTRICTION]: reducerUtil.singleTransferReducer('constriction'),
  [actions.SET_SHOW_LINK]: reducerUtil.singleTransferReducer('showLink'),
  [actions.SET_SORTABLE]: reducerUtil.singleTransferReducer('sortable'),
  [actions.SET_INPUT_TQL]: reducerUtil.singleTransferReducer('inputTql'),
  [actions.SET_INPUT_KEYS]: reducerUtil.singleTransferReducer('inputKeys'),
  [actions.SET_INPUT_SEARCH_FILTERS]: reducerUtil.singleTransferReducer('inputSearchFilters'),
  [actions.SET_DISABLE_PREFERENCES_MENU]: reducerUtil.singleTransferReducer('disablePreferencesMenu')
}

const initialState = {
  entityModel: {},
  entities: [],
  limit: 10,
  scope: 'list',
  currentPage: 1,
  sorting: [],
  formDefinition: null,
  entityCount: null,
  entityStore: {},
  inProgress: true,
  showSearchForm: true,
  searchFilters: [],
  createPermission: false,
  formSelectable: false,
  formClickable: false,
  showLink: false,
  sortable: true,
  lazyData: {},
  endpoint: null,
  searchEndpoint: null,
  constriction: null,
  inputTql: null,
  inputKeys: null,
  inputSearchFilters: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
