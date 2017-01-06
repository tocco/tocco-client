import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

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
  [actions.SET_FORM_DEFINITION]: singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_MODEL]: singleTransferReducer('entityModel'),
  [actions.SET_RELATION_ENTITIES]: singleTransferReducer('relationEntities')
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

