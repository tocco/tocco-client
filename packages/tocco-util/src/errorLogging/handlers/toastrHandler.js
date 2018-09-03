import notifier from '../../notifier'

import {put, call} from 'redux-saga/effects'

export default function* toastr(title, description, error) {
  const action = yield call(notifier.info, 'error', title, description, 'exclamation-circle', 0)
  yield put(action)
}
