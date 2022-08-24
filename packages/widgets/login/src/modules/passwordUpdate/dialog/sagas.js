import {all, call, put, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

export const validationRulesSelector = state => state.passwordUpdate.validationRules
export const inputSelector = state => state.input
export const usernameOrPkSelector = state => state.passwordUpdate.dialog.usernameOrPk
export const passwordSelector = state => state.passwordUpdate.password
export const standaloneSelector = state => state.passwordUpdate.dialog.standalone
export const intlSelector = state => state.intl

export default function* sagas() {
  yield all([takeLatest(actions.SET_CURRENT_USERNAME, setCurrentUsername)])
}

export function* setCurrentUsername() {
  const options = {
    acceptedStatusCodes: [403]
  }
  const response = yield call(rest.requestSaga, 'principals', options)
  if (response.status === 403) {
    consoleLogger.logError('input "username" on password-update is mandatory if no user is logged in')
  } else {
    const {username} = response.body
    yield put(actions.setUsernameOrPk(username))
  }
}
