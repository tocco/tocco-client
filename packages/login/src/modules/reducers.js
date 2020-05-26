import {combineReducers} from 'redux'

import passwordUpdateReducers, {sagas as passwordUpdateSagas} from './passwordUpdate/reducers'
import login from './login'
import loginForm from './loginForm'
import {sagas as twoStepLoginSagas} from './twoStepLogin'
import mainSagas from './sagas'
import passwordRequest, {sagas as passwordRequestSagas} from './passwordRequest'

export default {
  login,
  loginForm,
  passwordRequest,
  passwordUpdate: combineReducers(passwordUpdateReducers)
}

export const sagas = [
  mainSagas,
  passwordRequestSagas,
  twoStepLoginSagas,
  ...passwordUpdateSagas
]
