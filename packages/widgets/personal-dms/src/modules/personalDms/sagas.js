import {all, call, put, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

export default function* sagas() {
  yield all([takeLatest(actions.LOAD_PERSONAL_FOLDER_KEY, loadPersonalFolderKey)])
}

export function* loadPersonalFolderKey() {
  const userKey = yield getCurrentUserKey()
  const entitydocsFolderKey = yield getEntitydocsFolderKey(userKey)
  yield put(actions.setPersonalFolderKey(entitydocsFolderKey))
}

function* getCurrentUserKey() {
  const users = yield call(rest.fetchEntities, 'User', {where: 'pk == :currentUser'}, {method: 'GET'})

  if (users.length !== 1) {
    consoleLogger.logError('Exactly one user is expected during loading of the current user')
  }

  return users[0].key
}

function* getEntitydocsFolderKey(userKey) {
  const resource = `entities/2.0/User/${userKey}/entitydocs/folder`
  const options = {
    method: 'GET'
  }

  const folder = yield call(rest.requestSaga, resource, options)
  return folder.body.key
}
