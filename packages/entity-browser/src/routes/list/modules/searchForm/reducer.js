import * as actions from './actions'
import {reducers} from 'tocco-util'

const setSearchInput = (state, {payload}) => {
  if (payload.field) {
    return {
      ...state,
      searchInputs: {
        ...state.searchInputs,
        [payload.field]: payload.value
      }
    }
  }

  return state
}

const setPreselectedSearchFields = (state, {payload}) => {
  let newState = {
    ...state,
    preselectedSearchFields: payload.preselectedSearchFields
  }

  payload.preselectedSearchFields.forEach(f => {
    newState = setSearchInput(newState, {
      payload: {
        field: f.id,
        value: f.value
      }
    })
  })

  return newState
}

const reset = state => ({
  ...state,
  searchInputs: {}
})

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

const ACTION_HANDLERS = {
  [actions.SET_SEARCH_INPUT]: setSearchInput,
  [actions.RESET]: reset,
  [actions.SET_SIMPLE_SEARCH_FIELDS]: setSimpleSearchFields,
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_SHOW_EXTENDED_SEARCH_FORM]: reducers.singleTransferReducer('showExtendedSearchForm'),
  [actions.SET_PRESELECTED_SEARCH_FIELDS]: setPreselectedSearchFields,
  [actions.SET_DISABLE_SIMPLE_SEARCH]: reducers.singleTransferReducer('disableSimpleSearch')
}

const initialState = {
  formDefinition: [],
  searchInputs: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  preselectedSearchFields: [],
  disableSimpleSearch:false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

