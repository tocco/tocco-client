import {all, call} from 'redux-saga/effects'

import rest from '../rest'
import {clearAll} from './cache'

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
      yield call(clearAll)
    }
    clearCacheChecked = true
  }
}
