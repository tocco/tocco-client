import * as actions from './actions'

export const setRelationEntities = (state, {payload: {fieldName, entities, moreEntitiesAvailable}}) => (
  {
    ...state,
    data: {
      ...state.data,
      [fieldName]: {
        data: entities,
        isLoading: false,
        moreEntitiesAvailable
      }
    }
  }
)

export const setRelationEntitiesLoading = (state, {payload: {fieldName}}) => (
  {
    ...state,
    data: {
      ...state.data,
      [fieldName]: {
        isLoading: true,
        data: []
      }
    }
  }
)

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
