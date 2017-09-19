import {put, fork, takeLatest, all} from 'redux-saga/effects'
import {externalEvents} from 'tocco-util'
import * as actions from './actions'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.NAVIGATE_TO_CREATE, navigateToCreate)
  ])
}

export function* navigateToCreate() {
  yield put(externalEvents.fireExternalEvent('onNavigateToCreate'))
}
