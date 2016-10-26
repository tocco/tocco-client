import moduleSagas from './sagas'
import {fork} from 'redux-saga/effects'

export function* sagas() {
  yield [
    fork(moduleSagas)
  ]
}
