import * as actions from '../actions'

const addModalComponent = (state, {payload: {id, title, message, component, closable}}) => {
  return {
    ...state,
    modals: [...state.modals, {id, title, message, component, closable}]
  }
}

const removeModalComponent = (state, {payload: {id}}) => {
  return {
    ...state,
    modals: state.modals.filter(e => e.id !== id)
  }
}

const ACTION_HANDLERS = {
  [actions.MODAL_COMPONENT]: addModalComponent,
  [actions.REMOVE_MODAL_COMPONENT]: removeModalComponent
}

const initialState = {
  modals: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
