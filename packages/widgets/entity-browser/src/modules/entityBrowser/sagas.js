import {all, call, put, take} from 'redux-saga/effects'
import {appFactory, cache as cacheHelpers, notification} from 'tocco-app-extensions'
import {cache} from 'tocco-util'

export default function* sagas() {
  yield all([call(initialize)])
}

export function* initialize() {
  yield take(appFactory.INPUT_INITIALIZED)

  const needsCacheInvalidation = yield call(cacheHelpers.hasInvalidCache)

  if (needsCacheInvalidation) {
    yield call(cache.clearAll)
  }
  yield put(notification.connectSocket())
}
