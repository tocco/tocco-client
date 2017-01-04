// @flow

import * as actions from './actions'
import {Pages} from './../../types/Pages'

// not yet possible to use exact type ({| ... |}) with spread operator
// (see https://github.com/facebook/flow/issues/2405)
export type State = {
  currentPage: string,
  password: string,
  username: string
}

const changePage = (state: State, {payload}: PayloadAction<actions.ChangePagePayload>): State => {
  const {page} = payload
  return {
    ...state,
    currentPage: page
  }
}

const setUsername = (state: State, {payload}: PayloadAction<actions.SetUsernamePayload>): State => {
  const {username} = payload
  return {
    ...state,
    username
  }
}

const setPassword = (state: State, {payload}: PayloadAction<actions.SetPasswordPayload>): State => {
  const {password} = payload
  return {
    ...state,
    password
  }
}

const ACTION_HANDLERS = {
  [actions.CHANGE_PAGE]: changePage,
  [actions.SET_USERNAME]: setUsername,
  [actions.SET_PASSWORD]: setPassword
}

const initialState: State = {
  currentPage: Pages.LOGIN_FORM,
  username: '',
  password: ''
}

export default function reducer(state: State = initialState, action: Action): State {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
