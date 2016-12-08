import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const addRecordToStore = (state, {payload}) => ({
  ...state,
  recordStore: {
    ...state.recordStore,
    [payload.page]: payload.records
  }
})

const clearRecordStore = state => ({
  ...state,
  recordStore: {}
})

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: singleTransferReducer('formBase'),
  [actions.SET_RECORDS]: singleTransferReducer('records'),
  [actions.SET_SEARCH_FORM_DEFINITION]: singleTransferReducer('searchFormDefinition'),
  [actions.SET_COLUMN_DEFINITION]: singleTransferReducer('columnDefinition'),
  [actions.SET_SEARCH_TERM]: singleTransferReducer('searchTerm'),
  [actions.SET_LIMIT]: singleTransferReducer('limit'),
  [actions.SET_CURRENT_PAGE]: singleTransferReducer('currentPage'),
  [actions.SET_ORDER_BY]: singleTransferReducer('orderBy'),
  [actions.SET_SEARCH_TERM]: singleTransferReducer('searchTerm'),
  [actions.SET_RECORD_COUNT]: singleTransferReducer('recordCount'),
  [actions.ADD_RECORDS_TO_STORE]: addRecordToStore,
  [actions.CLEAR_RECORD_STORE]: clearRecordStore,
  [actions.SET_RECORD_REQUEST_IN_PROGRESS]: singleTransferReducer('recordRequestInProgress')
}

const initialState = {
  entityName: '',
  records: [],
  searchTerm: '',
  limit: 50,
  currentPage: 1,
  orderBy: {},
  searchFormDefinition: [],
  columnDefinition: [],
  recordCount: 0,
  recordStore: {},
  recordRequestInProgress: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

