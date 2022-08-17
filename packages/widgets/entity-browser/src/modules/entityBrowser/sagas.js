import {all, call, put, take} from 'redux-saga/effects'
import {appFactory, login} from 'tocco-app-extensions'

export default function* sagas() {
  yield all([call(connectSocket)])
}

export function* connectSocket() {
  yield take(appFactory.INPUT_INITIALIZED)
  yield put(login.doSessionCheck())
}
