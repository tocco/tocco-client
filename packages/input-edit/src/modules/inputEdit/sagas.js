import {actions, actionEmitter, rest} from 'tocco-app-extensions'
import {all, takeEvery, takeLatest, put, select, call} from 'redux-saga/effects'

import {UPDATE_SELECTION} from './actions'

const inputEditSelector = state => state.inputEdit

export default function* sagas() {
  yield all([
    takeEvery(actions.actions.ACTION_INVOKE, emit),
    takeLatest(UPDATE_SELECTION, updateInputDatas)
  ])
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}

export function* updateInputDatas() {
  const {selection} = yield select(inputEditSelector)
  yield call(rest.requestSaga, 'inputEdit/update-input-datas', {method: 'POST', body: selection})
}
