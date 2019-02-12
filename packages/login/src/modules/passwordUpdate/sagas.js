import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'

import {put, fork, take, all} from 'redux-saga/effects'

export function* initializeWatcher() {
  yield take(actions.INITIALIZED)
  yield put(externalEvents.fireExternalEvent('resize'))
}

export default function* sagas() {
  yield all([
    fork(initializeWatcher)
  ])
}
