import {fork, takeEvery, call, all} from 'redux-saga/effects'

import * as actions from './actions'
import {invokeExternalEvent} from './externalEvents'

export default function* sagas(events) {
  yield all([
    fork(takeEvery, actions.FIRE_EXTERNAL_EVENT, fireExternalEvent, events)
  ])
}

export function* fireExternalEvent(events, action) {
  const {name, payload} = action.payload
  yield call(invokeExternalEvent, events, name, payload)
}
