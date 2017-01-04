// @flow

export const REQUEST_PASSWORD = 'Login/REQUEST_PASSWORD'

export type RequestPasswordPayload = {|
  username: string
|}

export const requestPassword = (username: string): PayloadAction<RequestPasswordPayload> => ({
  type: REQUEST_PASSWORD,
  payload: {
    username
  }
})
