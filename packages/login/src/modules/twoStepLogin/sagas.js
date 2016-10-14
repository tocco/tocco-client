import {takeLatest} from 'redux-saga'
import {fork} from 'redux-saga/effects'
import {loginSaga} from '../sagas'
import * as actions from './actions'

export default function* saga() {
  yield [
    fork(takeLatest, actions.TWOSTEPLOGIN, loginSaga)
  ]
}
