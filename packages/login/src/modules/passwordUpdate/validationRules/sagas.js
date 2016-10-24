import fetch from 'isomorphic-fetch'
import * as actions from './actions'
import {takeLatest} from 'redux-saga'
import {call, fork, put, select} from 'redux-saga/effects'

export const usernameSelector = state => state.passwordUpdate.dialog.username

export function loadValidationRules(username) {
  return new Promise(resolve => {
    if (__DEV__) {
      const rules = require('../../../dev/validationRules.json')
      resolve(rules)
    } else {
      fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/password-rules`, {
        credentials: 'include'
      }).then(response => resolve(response.json()))
    }
  })
}

export function* fetchValidationRules() {
  const username = yield select(usernameSelector)
  const response = yield call(loadValidationRules, username)
  yield put(actions.setValidationRules(response.rules))
}

export default function* sagas() {
  yield [
    fork(takeLatest, actions.FETCH_VALIDATION_RULES, fetchValidationRules)
  ]
}
