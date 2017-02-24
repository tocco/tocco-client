// @flow

export const CHANGE_PAGE = 'Login/CHANGE_PAGE'
export const SET_USERNAME = 'Login/SET_USERNAME'
export const SET_PASSWORD = 'Login/SET_PASSWORD'

export type ChangePagePayload = {|
  page: string
|}

export const changePage = (page: string): PayloadAction<ChangePagePayload> => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
})

export type SetUsernamePayload = {|
  username: string
|}

export const setUsername = (username: string): PayloadAction<SetUsernamePayload> => ({
  type: SET_USERNAME,
  payload: {
    username
  }
})

export type SetPasswordPayload = {|
  password: string
|}

export const setPassword = (password: string): PayloadAction<SetPasswordPayload> => ({
  type: SET_PASSWORD,
  payload: {
    password
  }
})
