import {actions, actionEmitter, rest} from 'tocco-app-extensions'
import {all, takeEvery, takeLatest, put, select, call} from 'redux-saga/effects'

import {CHECK_SELECTION, setValidation} from './actions'

const inputEditSelector = state => state.inputEdit

export default function* sagas() {
  yield all([
    takeEvery(actions.actions.ACTION_INVOKE, emit),
    takeLatest(CHECK_SELECTION, checkSelection)
  ])
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}

export function* checkSelection() {
  const {selection} = yield select(inputEditSelector)
  const {body} = yield call(rest.requestSaga, 'inputEdit/selection', {method: 'POST', body: selection})
  yield put(setValidation(body))
}
