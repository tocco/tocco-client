import {takeEvery} from 'redux-saga'
import {fork} from 'redux-saga/effects'

export function* save() {

}

export function* fnc() {

}

export default function* sagas() {
  yield [
    fork(takeEvery, 'test', fnc)
  ]
}
