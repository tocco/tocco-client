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
  [actions.SET_COLUMN_DEFINITION]: singleTransferReducer('columnDefinition'),
  [actions.SET_LIMIT]: singleTransferReducer('limit'),
  [actions.SET_CURRENT_PAGE]: singleTransferReducer('currentPage'),
  [actions.SET_ORDER_BY]: singleTransferReducer('orderBy'),
  [actions.SET_RECORD_COUNT]: singleTransferReducer('recordCount'),
  [actions.ADD_RECORDS_TO_STORE]: addRecordToStore,
  [actions.CLEAR_RECORD_STORE]: clearRecordStore,
  [actions.SET_IN_PROGRESS]: singleTransferReducer('inProgress')
}

const initialState = {
  entityName: '',
  formBase: '',
  records: [],
  limit: 50,
  currentPage: 1,
  orderBy: {},
  columnDefinition: [],
  recordCount: 0,
  recordStore: {},
  inProgress: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

