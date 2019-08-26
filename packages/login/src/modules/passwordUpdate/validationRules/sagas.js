import {rest} from 'tocco-app-extensions'
import {takeLatest, call, fork, put, select, all} from 'redux-saga/effects'

import * as actions from './actions'

export const usernameSelector = state => state.passwordUpdate.dialog.username
export const intlSelector = state => state.intl

export function* loadValidationRules(username, locale = '') {
  const resource = `principals/${username}/password-rules`

  const validationResponse = yield call(rest.requestSaga, resource, {queryParams: {locale}})
  return validationResponse.body
}

export function* fetchValidationRules() {
  const username = yield select(usernameSelector)
  const {locale} = yield select(intlSelector)

  const response = yield call(loadValidationRules, username, locale)
  yield put(actions.setValidationRules(response.rules))
}

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.FETCH_VALIDATION_RULES, fetchValidationRules)
  ])
}
