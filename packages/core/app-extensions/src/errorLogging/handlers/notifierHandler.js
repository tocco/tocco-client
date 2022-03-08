import {put, call} from 'redux-saga/effects'

import notification from '../../notification'

export default function* notificationHandler(title, description, error) {
  const action = yield call(notification.toaster, {type: 'error', title, body: description})
  yield put(action)
}
