import * as actions from './actions'

export const setLinkFactory = (state, {payload: {linkFactory}}) => (
  {
    ...state,
    linkFactory
  }
)

const ACTION_HANDLERS = {
  [actions.SET_LINK_FACTORY]: setLinkFactory
}

const initialState = {
  linkFactory: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
