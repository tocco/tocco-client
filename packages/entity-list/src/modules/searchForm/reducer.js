import {reducer as reducerUtil} from 'tocco-util'

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

const setSearchFilterActive = (state, {payload: {searchFilterId, active, exclusive}}) => ({
  ...state,
  searchFilters: [...state.searchFilters.map(searchFilter =>
    ({...searchFilter, ...(searchFilterId === searchFilter.uniqueId ? {active} : exclusive ? {active: !active} : {})})
  )]
})

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducerUtil.singleTransferReducer('initialized'),
  [actions.SET_SIMPLE_SEARCH_FIELDS]: setSimpleSearchFields,
  [actions.SET_FORM_DEFINITION]: reducerUtil.singleTransferReducer('formDefinition'),
  [actions.SET_SHOW_EXTENDED_SEARCH_FORM]: reducerUtil.singleTransferReducer('showExtendedSearchForm'),
  [actions.SET_DISABLE_SIMPLE_SEARCH]: reducerUtil.singleTransferReducer('disableSimpleSearch'),
  [actions.SET_VALUES_INITIALIZED]: reducerUtil.singleTransferReducer('valuesInitialized'),
  [actions.SET_FORM_FIELDS_FLAT]: reducerUtil.singleTransferReducer('formFieldsFlat'),
  [actions.SET_SEARCH_FILTERS]: reducerUtil.singleTransferReducer('searchFilters'),
  [actions.SET_SEARCH_FILTER_ACTIVE]: setSearchFilterActive
}

const initialState = {
  initialized: false,
  formDefinition: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  disableSimpleSearch: false,
  valuesInitialized: false,
  searchFilters: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
