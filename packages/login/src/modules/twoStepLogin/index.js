import {fork, all} from 'redux-saga/effects'

import moduleSagas from './sagas'

export function* sagas() {
  yield all([
    fork(moduleSagas)
  ])
}
