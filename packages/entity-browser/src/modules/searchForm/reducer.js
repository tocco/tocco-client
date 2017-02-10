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

const reset = state => ({
  ...state,
  searchInputs: {}
})

const ACTION_HANDLERS = {
  [actions.SET_SEARCH_INPUT]: setSearchInput,
  [actions.RESET]: reset,
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel'),
  [actions.SET_RELATION_ENTITIES]: reducers.singleTransferReducer('relationEntities')
}

const initialState = {
  formDefinition: [],
  entityModel: {},
  relationEntities: {},
  searchInputs: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

