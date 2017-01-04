// @flow

import {intlReducer} from 'react-intl-redux'
import {combineReducers} from 'redux'
import passwordUpdateReducers, {sagas as passwordUpdateSagas} from './passwordUpdate/reducers'
import login from './login'
import type {State as LoginState} from './login'
import loginForm from './loginForm'
import twoStepLogin, {sagas as twoStepLoginSagas} from './twoStepLogin'
import mainSagas from './sagas'
import {sagas as passwordRequestSagas} from './passwordRequest'

export default {
  intl: intlReducer,
  login,
  loginForm,
  twoStepLogin,
  passwordUpdate: combineReducers(passwordUpdateReducers)
}

export const sagas = [
  mainSagas,
  passwordRequestSagas,
  twoStepLoginSagas,
  ...passwordUpdateSagas
]

export type GlobalState = {
  intl: IntlState,
  login: LoginState
}
