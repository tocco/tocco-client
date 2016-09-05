import {FETCH_VALIDATION_RULES, setValidationRules} from './actions'
import {takeLatest} from 'redux-saga'
import {call, fork, put} from 'redux-saga/effects'

export function loadValidationRules() {
  return new Promise(resolve => {
    const rules = require('../../dev_validationRules.json');
    resolve(rules)
  })
}

function* fetchValidationRules(action) {
  const rules = yield call(loadValidationRules)
  yield put(setValidationRules(rules))
}

export default function* sagas() {
  yield [
    fork(takeLatest, FETCH_VALIDATION_RULES, fetchValidationRules),
  ]
}
