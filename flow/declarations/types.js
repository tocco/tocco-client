/* eslint no-unused-vars: 0 */

type Action = {
  type: string
}

type PayloadAction<P> = {|
  type: string,
  payload: P
|}

type IntlMessages = {|
  [key: string]: string
|}

type IntlState = {
  messages: IntlMessages
}
