import {put, takeLatest, all} from 'redux-saga/effects'
import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'

export function* resizeWatcher() {
  yield put(externalEvents.fireExternalEvent('resize'))
}

export default function* sagas() {
  yield all([takeLatest(actions.INITIALIZED, resizeWatcher)])
}
