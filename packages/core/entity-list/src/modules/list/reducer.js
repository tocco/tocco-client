import _get from 'lodash/get'
import {reducer as reducerUtil} from 'tocco-util'

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
const getOpposite = order => (order === 'asc' ? 'desc' : 'asc')
const setSortingInteractive = (state, {payload: {field, add}}) => {
  if (!add) {
    const currentSorting = state.sorting
    const order =
      currentSorting.length > 0 && currentSorting[0].field === field
        ? getOpposite(currentSorting[0].order)
        : defaultOrder
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
  [actions.SET_SEARCH_LIST_FORM_DEFINITION]: reducerUtil.singleTransferReducer('searchListFormDefinition'),
  [actions.SET_ENTITY_MODEL]: reducerUtil.singleTransferReducer('entityModel'),
  [actions.SET_CURRENT_PAGE]: reducerUtil.singleTransferReducer('currentPage'),
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting'),
  [actions.SET_SORTING_INTERACTIVE]: setSortingInteractive,
  [actions.SET_ENTITY_COUNT]: reducerUtil.singleTransferReducer('entityCount'),
  [actions.ADD_ENTITIES_TO_STORE]: addEntityToStore,
  [actions.SET_LAZY_DATA]: setLazyData,
  [actions.CLEAR_ENTITY_STORE]: clearEntityStore,
  [actions.SET_IN_PROGRESS]: reducerUtil.singleTransferReducer('inProgress'),
  [actions.SET_SEARCH_FILTERS]: reducerUtil.singleTransferReducer('searchFilters'),
  [actions.SET_CONSTRICTION]: reducerUtil.singleTransferReducer('constriction')
}

const initialState = {
  entityModel: {},
  entities: [],
  currentPage: 1,
  sorting: [],
  formDefinition: null,
  searchListFormDefinition: null,
  entityCount: null,
  entityStore: {},
  inProgress: true,
  searchFilters: [],
  createPermission: false,
  lazyData: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
