import fetch from 'isomorphic-fetch'
import * as actions from './actions'
import {takeLatest} from 'redux-saga'
import {call, fork, put, select} from 'redux-saga/effects'

export const principalPkInputSelector = state => state.input.principalPk

export function loadValidationRules(principalPk) {
  return new Promise(resolve => {
    if (__DEV__) {
      const rules = require('../../dev_validationRules.json')
      resolve(rules)
    } else {
      fetch(`${__BACKEND_URL__}/nice2/rest/principals/${principalPk}/password-rules`, {
        credentials: 'include'
      }).then(response => resolve(response.json()))
    }
  })
}

function* fetchValidationRules(action) {
  const principalPk = yield select(principalPkInputSelector)
  const response = yield call(loadValidationRules, principalPk)
  yield put(actions.setValidationRules(response.rules))
}

export default function* sagas() {
  yield [
    fork(takeLatest, actions.FETCH_VALIDATION_RULES, fetchValidationRules)
  ]
}
