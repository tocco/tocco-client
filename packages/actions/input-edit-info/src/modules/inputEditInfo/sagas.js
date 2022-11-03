import {all, takeLatest, call, put, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeLatest(actions.INITIALIZE_INFORMATION, initialize)])
}

export function* initialize() {
  const {selection} = yield select(inputSelector)
  const {body} = yield call(rest.requestSaga, 'inputEdit/information', {method: 'POST', body: selection})
  yield put(actions.setInformation(body))
}
