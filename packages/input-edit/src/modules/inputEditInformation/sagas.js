import {all, takeLatest, call, put, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from '../inputEditInformation/actions'

const inputEditSelector = state => state.inputEdit

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE_INFORMATION, initialize)
  ])
}

export function* initialize() {
  const {selection, validation} = yield select(inputEditSelector)
  if (validation.valid) {
    const {body} = yield call(rest.requestSaga, 'inputEdit/information', {method: 'POST', body: selection})
    yield put(actions.setInformation(body))
  }
}
