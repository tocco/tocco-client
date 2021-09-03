import {rest, notification} from 'tocco-app-extensions'
import {takeLatest, all, call, put, select, delay, spawn} from 'redux-saga/effects'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

const dbRefactoringSelector = state => state.dbRefactoring

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_MODULES, loadModules),
    takeLatest(actions.LOAD_FRAGMENTS, loadFragments),
    takeLatest(actions.EXECUTE_DB_REFACTORING, executeDbRefactoring)
  ])
}

export function* loadModules() {
  const response = yield call(rest.requestSaga, 'devcon/dbrefactoring/modules')
  yield put(actions.setModules(response.body.map(module => ({
    key: module,
    display: module
  }))))
}

export function* loadFragments() {
  const response = yield call(rest.requestSaga, 'devcon/dbrefactoring/fragments')
  yield put(actions.setFragments(response.body))
}

export function* executeDbRefactoring() {
  const {selectedModules, selectedFragments, version, ignoreErrors} = yield select(dbRefactoringSelector)

  const options = {
    method: 'POST',
    body: {
      modules: selectedModules.map(module => module.key),
      fragments: selectedFragments,
      version,
      ignoreErrors
    }
  }

  try {
    const response = yield call(rest.requestSaga, 'devcon/dbrefactoring/executions', options)
    yield spawn(pollExecution, response.headers.get('Location'))
  } catch (e) {
    consoleLogger.logError('DB refactoring execution failed', e)
    yield put(notification.toaster({
      type: 'error',
      title: 'DB refactoring execution failed'
    }))
  }
}

export function* pollExecution(location) {
  yield delay(3000)
  const response = yield call(rest.requestSaga, location)
  const state = response.body.state.toLowerCase()
  if (state === 'completed') {
    yield put(actions.unsetRunning())
    yield put(notification.toaster({
      type: 'success',
      title: 'DB refactoring execution completed'
    }))
  } else if (state === 'failed') {
    yield put(actions.unsetRunning())
    yield put(notification.toaster({
      type: 'error',
      title: 'DB refactoring execution failed'
    }))
  } else {
    yield call(pollExecution, location)
  }
}
