import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

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
  [actions.SET_ENTITIES]: singleTransferReducer('entities'),
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_COLUMN_DEFINITION]: singleTransferReducer('columnDefinition'),
  [actions.SET_LIMIT]: singleTransferReducer('limit'),
  [actions.SET_CURRENT_PAGE]: singleTransferReducer('currentPage'),
  [actions.SET_ORDER_BY]: singleTransferReducer('orderBy'),
  [actions.SET_ENTITY_COUNT]: singleTransferReducer('entityCount'),
  [actions.ADD_ENTITIES_TO_STORE]: addEntityToStore,
  [actions.CLEAR_ENTITY_STORE]: clearEntityStore,
  [actions.SET_IN_PROGRESS]: singleTransferReducer('inProgress')
}

const initialState = {
  entityName: '',
  formBase: '',
  entities: [],
  limit: 50,
  currentPage: 1,
  orderBy: null,
  columnDefinition: [],
  entityCount: 0,
  entityStore: {},
  inProgress: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

