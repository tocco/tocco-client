import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const addRecordToCache = (state, {payload}) => ({
  ...state,
  recordsCache: {
    ...state.recordsCache,
    [payload.page]: payload.records
  }
})

const clearRecordCache = (state, {payload}) => ({
  ...state,
  recordsCache: {}
})

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_RECORDS]: singleTransferReducer('records'),
  [actions.SET_COLUMN_DEFINITION]: singleTransferReducer('columnDefinition'),
  [actions.SET_SEARCH_TERM]: singleTransferReducer('searchTerm'),
  [actions.SET_LIMIT]: singleTransferReducer('limit'),
  [actions.SET_CURRENT_PAGE]: singleTransferReducer('currentPage'),
  [actions.SET_ORDER_BY]: singleTransferReducer('orderBy'),
  [actions.SET_RECORD_COUNT]: singleTransferReducer('recordCount'),
  [actions.ADD_RECORDS_TO_CACHE]: addRecordToCache,
  [actions.CLEAR_RECORDS_CACHE]: clearRecordCache
}

const initialState = {
  entityName: '',
  records: [],
  searchTerm: '',
  limit: 50,
  currentPage: 1,
  orderBy: [],
  columnDefinition: [],
  recordCount: 0,
  recordsCache: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

