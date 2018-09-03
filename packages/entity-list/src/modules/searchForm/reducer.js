import {reducers} from 'tocco-util'

import * as actions from './actions'

const simpleSearchFieldsToArray = simpleSearchFields => (
  simpleSearchFields.split(',')
    .filter(s => s)
    .map(s => s.trim())
)

const setSimpleSearchFields = (state, {payload}) => {
  const fieldArray = simpleSearchFieldsToArray(payload.simpleSearchFields)
  if (fieldArray.length > 0) {
    return {
      ...state,
      simpleSearchFields: fieldArray
    }
  }
  return state
}

const setSearchFilter = (state, {payload}) => {
  const searchFilter = payload.filter
  return {...state, searchFilter}
}

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducers.singleTransferReducer('initialized'),
  [actions.SET_SEARCH_FORM_NAME]: reducers.singleTransferReducer('searchFormName'),
  [actions.SET_SIMPLE_SEARCH_FIELDS]: setSimpleSearchFields,
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_SHOW_EXTENDED_SEARCH_FORM]: reducers.singleTransferReducer('showExtendedSearchForm'),
  [actions.SET_DISABLE_SIMPLE_SEARCH]: reducers.singleTransferReducer('disableSimpleSearch'),
  [actions.SET_VALUES_INITIALIZED]: reducers.singleTransferReducer('valuesInitialized'),
  [actions.SET_SEARCH_FILTER]: setSearchFilter,
  [actions.SET_SHOW_FULL_TEXT_SEARCH_FORM]: reducers.singleTransferReducer('showFullTextSearchForm')
}

const initialState = {
  initialized: false,
  searchFormName: '',
  formDefinition: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  disableSimpleSearch: false,
  valuesInitialized: false,
  showFullTextSearchForm: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
