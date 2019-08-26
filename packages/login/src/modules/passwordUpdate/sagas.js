import {externalEvents} from 'tocco-app-extensions'
import {put, fork, take, all} from 'redux-saga/effects'

import * as actions from './actions'

export function* initializeWatcher() {
  yield take(actions.INITIALIZED)
  yield put(externalEvents.fireExternalEvent('resize'))
}

export default function* sagas() {
  yield all([
    fork(initializeWatcher)
  ])
}
