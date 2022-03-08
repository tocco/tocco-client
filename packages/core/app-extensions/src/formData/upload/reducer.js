import * as actions from './actions'

export const setChooseDocument = (state, {payload: {chooseDocument}}) => {
  return {
    ...state,
    chooseDocument
  }
}

const ACTION_HANDLERS = {
  [actions.SET_CHOOSE_DOCUMENT]: setChooseDocument
}

const initialState = {
  chooseDocument: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
