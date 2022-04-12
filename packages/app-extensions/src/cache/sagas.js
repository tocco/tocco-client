import {all, call, put, takeLatest} from 'redux-saga/effects'
import {cache} from 'tocco-util'

import * as actions from './actions'
import {hasInvalidCache} from './utils'

export default function* mainSagas() {
  yield all([takeLatest(actions.INITIALISE, init)])
}

let cacheInitialised = false
export const resetCacheInitialised = () => {
  cacheInitialised = false
}

export function* init() {
  /**
   * Run cache initialisation only once per page request.
   * When we nest client packages they get empty stores and do not know if parent already
   * have initialised the cache. Use local variable in file therefore and update child store.
   */
  if (cacheInitialised) {
    yield put(actions.setInitialised(true))
    return
  }

  const needsCacheInvalidation = yield call(hasInvalidCache)

  if (needsCacheInvalidation) {
    yield call(cache.clearAll)
  }

  cacheInitialised = true
  yield put(actions.setInitialised(true))
}
