import moduleSagas from './sagas'
import {fork, all} from 'redux-saga/effects'

export function* sagas() {
  yield all([
    fork(moduleSagas)
  ])
}
