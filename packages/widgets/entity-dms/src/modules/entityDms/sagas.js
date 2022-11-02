import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeLatest(actions.LOAD_FOLDER_KEY, loadFolderKey)])
}

export function* loadFolderKey() {
  const {entityModel} = yield select(inputSelector)

  const resource = `documents/entityModel/${entityModel}/folder`
  const options = {
    method: 'GET'
  }

  const folder = yield call(rest.requestSaga, resource, options)

  yield put(actions.setFolderKey(folder.body.key))
}
