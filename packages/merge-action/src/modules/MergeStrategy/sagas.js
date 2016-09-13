import {takeEvery} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'

export function* save() {

}

export function* fnc() {

}

export default function* sagas() {
  yield [
    fork(takeEvery, 'test', fnc)
  ]
}
