import {combineReducers} from 'redux'

import login from './login'
import loginForm from './loginForm'
import passwordRequest, {sagas as passwordRequestSagas} from './passwordRequest'
import passwordUpdateReducers, {sagas as passwordUpdateSagas} from './passwordUpdate/reducers'
import mainSagas from './sagas'
import twoStepLogin, {sagas as twoStepLoginSagas} from './twoStepLogin'

export default {
  login,
  loginForm,
  passwordRequest,
  passwordUpdate: combineReducers(passwordUpdateReducers),
  twoStepLogin
}

export const sagas = [mainSagas, passwordRequestSagas, twoStepLoginSagas, ...passwordUpdateSagas]
