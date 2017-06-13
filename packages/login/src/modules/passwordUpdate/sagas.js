import * as actions from './actions'
import {put, fork, take, all} from 'redux-saga/effects'
import {externalEvents} from 'tocco-util'

export function* initializeWatcher() {
  yield take(actions.INITIALIZED)
  yield put(externalEvents.fireExternalEvent('resize'))
}

export default function* sagas() {
  yield all([
    fork(initializeWatcher)
  ])
}
