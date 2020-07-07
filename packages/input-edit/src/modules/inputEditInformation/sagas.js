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
  const {entityKey} = yield select(inputEditSelector)
  const {body} = yield call(rest.requestSaga, `inputEdit/${entityKey}/information`)
  yield put(actions.setInformation(body))
}
