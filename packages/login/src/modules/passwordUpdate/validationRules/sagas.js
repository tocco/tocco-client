import {rest} from 'tocco-app-extensions'
import {takeLatest, call, put, select, all} from 'redux-saga/effects'

import * as actions from './actions'

export const usernameOrPkSelector = state => state.passwordUpdate.dialog.usernameOrPk
export const intlSelector = state => state.intl

export function* loadValidationRules(usernameOrPk, locale = '') {
  const resource = `principals/${usernameOrPk}/password-rules`

  const validationResponse = yield call(rest.requestSaga, resource, {queryParams: {locale}})
  return validationResponse.body
}

export function* fetchValidationRules() {
  const usernameOrPk = yield select(usernameOrPkSelector)
  const {locale} = yield select(intlSelector)

  const response = yield call(loadValidationRules, usernameOrPk, locale)
  yield put(actions.setValidationRules(response.rules))
}

export default function* sagas() {
  yield all([
    takeLatest(actions.FETCH_VALIDATION_RULES, fetchValidationRules)
  ])
}
