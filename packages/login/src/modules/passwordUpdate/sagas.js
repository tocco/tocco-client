import * as actions from './actions'
import {call, fork, take} from 'redux-saga/effects'
import {ExternalEvents} from 'tocco-util'

export function* initializeWatcher() {
  yield take(actions.INITIALIZED)
  yield call(ExternalEvents.invokeExternalEvent, 'initialized')
}

export default function* sagas() {
  yield [
    fork(initializeWatcher)
  ]
}
