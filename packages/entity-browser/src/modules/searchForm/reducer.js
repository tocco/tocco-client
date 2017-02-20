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

const ACTION_HANDLERS = {
  [actions.SET_SEARCH_INPUT]: setSearchInput,
  [actions.RESET]: reset,
  [actions.SET_SIMPLE_SEARCH_FIELDS]: reducers.singleTransferReducer('simpleSearchFields'),
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel'),
  [actions.SET_RELATION_ENTITIES]: reducers.singleTransferReducer('relationEntities'),
  [actions.SET_SHOW_EXTENDED_SEARCH_FORM]: reducers.singleTransferReducer('showExtendedSearchForm'),
  [actions.SET_PRESELECTED_SEARCH_FIELDS]: setPreselectedSearchFields
}

const initialState = {
  formDefinition: [],
  entityModel: {},
  relationEntities: {},
  searchInputs: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  preselectedSearchFields: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

