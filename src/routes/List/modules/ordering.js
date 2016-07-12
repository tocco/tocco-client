import { fetchEntities } from './list'

export const SET_ORDERING = 'SET_ORDERING'

export function setOrdering(ordering) {
  return (dispatch, getState) => {
    new Promise((resolve) => {
      resolve(dispatch({
        type: SET_ORDERING,
        ordering: {name: ordering}
      }))
    }).then(() => {
      const { entityModel, searchTerm, ordering } = getState().list
      dispatch(fetchEntities(entityModel, searchTerm, ordering))
    })
  }
}

const ACTION_HANDLERS = {
  [SET_ORDERING]: (ordering, { ordering: newOrdering }) => {
    var state = Object.assign({}, newOrdering)
    if (ordering && newOrdering && newOrdering.name === ordering.name && ordering.direction === 'asc') {
      state.direction = 'desc'
    } else {
      state.direction = 'asc'
    }
    return state
  }
}

const initialState = null

export default function orderingReducer(state: ordering = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
