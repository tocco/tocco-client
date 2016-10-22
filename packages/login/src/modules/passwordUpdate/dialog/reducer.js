import * as actions from './actions'

const initialState = {
  showOldPasswordField: true,
  forcedUpdate: false,
  standalone: true,
  username: ''
}

const singleTransferReducer = attributeName => {
  return (state, {payload}) => {
    const val = payload[attributeName]
    return {
      ...state,
      [attributeName]: val
    }
  }
}

const ACTION_HANDLERS = {
  [actions.SET_SHOW_OLD_PASSWORD]: singleTransferReducer('showOldPasswordField'),
  [actions.SET_FORCED_UPDATE]: singleTransferReducer('forcedUpdate'),
  [actions.SET_STANDALONE]: singleTransferReducer('standalone'),
  [actions.SET_USERNAME]: singleTransferReducer('username')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

