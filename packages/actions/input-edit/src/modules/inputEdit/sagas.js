import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {actionEmitter, actions, rest, appFactory} from 'tocco-app-extensions'

import * as inputEditTableActions from '../inputEditTable/actions'
import * as inputEditAction from './actions'

const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    takeEvery(actions.actions.ACTION_INVOKE, emit),
    takeLatest(appFactory.INPUT_INITIALIZED, updateInputDatas),
    takeLatest(actions.actions.ACTION_INVOKED, reload)
  ])
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}

export function* reload() {
  yield put(inputEditTableActions.initializeTable())
}

export function* updateInputDatas() {
  yield put(inputEditAction.setSelectionUpdateInProgress(true))
  const {selection} = yield select(inputSelector)
  yield call(rest.requestSaga, 'inputEdit/update-input-datas', {method: 'POST', body: selection})
  yield put(inputEditAction.setSelectionUpdateInProgress(false))
}
