import * as actions from './actions'

const initialState = {
  showOldPasswordField: true,
  forcedUpdate: false,
  standalone: true,
  usernameOrPk: ''
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
  [actions.SET_USERNAME_OR_PK]: singleTransferReducer('usernameOrPk')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
