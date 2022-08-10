import {takeEvery, call, all, select} from 'redux-saga/effects'

import * as actions from './actions'
import {invokeExternalEvent} from './externalEvents'

export default function* sagas(configSelector) {
  yield all([takeEvery(actions.FIRE_EXTERNAL_EVENT, fireExternalEvent, configSelector)])
}

export function* fireExternalEvent(configSelector, action) {
  const {name, payload} = action.payload
  const events = yield select(configSelector)
  yield call(invokeExternalEvent, events, name, payload)
}
