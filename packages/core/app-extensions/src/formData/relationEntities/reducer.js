import * as actions from './actions'

export const setRelationEntities = (state, {payload: {fieldName, entities, moreEntitiesAvailable, searchTerm}}) => ({
  ...state,
  data: {
    ...state.data,
    [fieldName]: {
      data: entities,
      isLoading: false,
      moreEntitiesAvailable,
      searchTerm
    }
  }
})

export const setRelationEntitiesLoading = (state, {payload: {fieldName, clearData}}) => ({
  ...state,
  data: {
    ...state.data,
    [fieldName]: {
      ...(clearData
        ? {
            searchTerm: undefined,
            data: []
          }
        : {
            searchTerm: state.data[fieldName]?.searchTerm,
            data: state.data[fieldName]?.data || []
          }),
      isLoading: true
    }
  }
})

const ACTION_HANDLERS = {
  [actions.SET_RELATION_ENTITIES]: setRelationEntities,
  [actions.SET_RELATION_ENTITIES_LOADING]: setRelationEntitiesLoading
}

const initialState = {
  data: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
