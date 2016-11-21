import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_RECORDS]: singleTransferReducer('records'),
  [actions.SET_COLUMN_DEFINITION]: singleTransferReducer('columnDefinition'),
  [actions.SET_SEARCHTERM]: singleTransferReducer('searchTerm'),
  [actions.SET_MAX_RECORDS]: singleTransferReducer('maxRecords'),
  [actions.SET_CURRENT_PAGE]: singleTransferReducer('currentPage'),
  [actions.SET_ORDER_BY]: singleTransferReducer('orderBy')
}

const initialState = {
  entityName: '',
  records: [],
  searchTerm: '',
  maxRecords: 25,
  currentPage: 1,
  orderBy: [],
  columnDefinition: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
