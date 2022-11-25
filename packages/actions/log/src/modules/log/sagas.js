import {all, call, put, takeEvery} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeEvery(actions.FETCH_DATA, fetchData), takeEvery(actions.FETCH_FILECONTENT, fetchFileContent)])
}

export function* fetchData() {
  const url = '/logfiles'
  try {
    const response = yield call(rest.simpleRequest, url)
    let data = null

    if (response) {
      data = response.body.fileNames
    }
    yield put(actions.setData(data))
  } catch (e) {
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.log.error-fetchFileNames.header',
        body: 'client.actions.log.error-fetchFileNames.body'
      })
    )
    yield put(actions.setData(null))
  }
}

export function* fetchFileContent({payload: {conditionString}}) {
  const url = '/logfiles/' + conditionString
  try {
    const response = yield call(rest.simpleRequest, url)
    let fileContent = null
    if (response) {
      fileContent = response.body
    }

    yield put(actions.setFileContent(fileContent))
  } catch (e) {
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.log.error.loading-fetchFileContent.header',
        body: 'client.actions.log.error-fetchFileContent.body'
      })
    )
    yield put(actions.setFileContent(null))
  }
}
