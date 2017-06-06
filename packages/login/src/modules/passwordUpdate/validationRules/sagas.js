import * as actions from './actions'
import {takeLatest, call, fork, put, select, all} from 'redux-saga/effects'

export const usernameSelector = state => state.passwordUpdate.dialog.username

export function loadValidationRules(username) {
  return fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/password-rules`, {
    credentials: 'include'
  }).then(response => response.json())
}

export function* fetchValidationRules() {
  const username = yield select(usernameSelector)
  const response = yield call(loadValidationRules, username)
  yield put(actions.setValidationRules(response.rules))
}

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.FETCH_VALIDATION_RULES, fetchValidationRules)
  ])
}
