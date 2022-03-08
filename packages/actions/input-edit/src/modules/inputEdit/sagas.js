import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {actionEmitter, actions, rest} from 'tocco-app-extensions'

import * as inputEditTableActions from '../inputEditTable/actions'
import * as inputEditAction from './actions'
import {UPDATE_SELECTION} from './actions'

const inputEditSelector = state => state.inputEdit

export default function* sagas() {
  yield all([
    takeEvery(actions.actions.ACTION_INVOKE, emit),
    takeLatest(UPDATE_SELECTION, updateInputDatas),
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
  const {selection} = yield select(inputEditSelector)
  yield call(rest.requestSaga, 'inputEdit/update-input-datas', {method: 'POST', body: selection})
  yield put(inputEditAction.setSelectionUpdateInProgress(false))
}
