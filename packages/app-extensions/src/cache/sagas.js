import {all, call} from 'redux-saga/effects'
import {cache} from 'tocco-util'

import rest from '../rest'

export default function* mainSagas() {
  yield all([
    init()
  ])
}

let clearCacheChecked = false

export function* init() {
  if (!clearCacheChecked) {
    const revisionChanged = yield call(rest.hasRevisionIdChanged)
    if (revisionChanged) {
      yield call(cache.clearAll)
    }
    clearCacheChecked = true
  }
}
