import * as actions from './actions'

export const setToolTip = (state, {payload: {entity, id, tooltip}}) => (
  {
    ...state,
    data: {
      ...state.data,
      [entity]: {
        ...state.data[entity],
        [id]: tooltip
      }
    }
  }
)

const ACTION_HANDLERS = {
  [actions.SET_TOOLTIP]: setToolTip
}

const initialState = {
  data: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
