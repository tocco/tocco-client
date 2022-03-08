import * as actions from './actions'

const openDialog = (state, {payload: {directory, onSuccess, onError}}) => ({
  ...state,
  dialog: {
    instanceCount: state.dialog.instanceCount + 1,
    directory,
    onSuccess,
    onError
  }
})

const ACTION_HANDLERS = {
  [actions.OPEN_DIALOG]: openDialog
}

const initialState = {
  dialog: {
    instanceCount: 0,
    directory: false,
    onSuccess: null,
    onError: null
  }
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
