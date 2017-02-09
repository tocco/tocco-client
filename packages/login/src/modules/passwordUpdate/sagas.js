import * as actions from './actions'
import {call, fork, take} from 'redux-saga/effects'
import {externalEvents} from 'tocco-util'

export function* initializeWatcher() {
  yield take(actions.INITIALIZED)
  yield call(externalEvents.invokeExternalEvent, 'resize')
}

export default function* sagas() {
  yield [
    fork(initializeWatcher)
  ]
}
