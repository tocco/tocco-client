export const SET_ORDERING = 'SET_ORDERING'


export function setOrdering(ordering) {
  return {
    type: SET_ORDERING,
    ordering
  }
}


const ACTION_HANDLERS = {
  [SET_ORDERING]: (ordering, { ordering: newOrdering }) => {
    var state = {name: newOrdering}
    if (ordering && newOrdering && newOrdering === ordering.name && ordering.direction === 'asc') {
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
