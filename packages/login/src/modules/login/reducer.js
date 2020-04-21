import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'
import {Pages} from './../../types/Pages'

const changePage = (state, {payload}) => {
  const {page} = payload
  return {
    ...state,
    currentPage: page
  }
}

const setUsername = (state, {payload}) => {
  const {username} = payload
  return {
    ...state,
    username
  }
}

const setPassword = (state, {payload}) => {
  const {password} = payload
  return {
    ...state,
    password
  }
}

const ACTION_HANDLERS = {
  [actions.CHANGE_PAGE]: changePage,
  [actions.SET_USERNAME]: setUsername,
  [actions.SET_PASSWORD]: setPassword,
  [actions.SET_CAPTCHA_KEY]: reducerUtil.singleTransferReducer('captchaKey')
}

const initialState = {
  currentPage: Pages.LOGIN_FORM,
  username: '',
  password: '',
  captchaKey: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
