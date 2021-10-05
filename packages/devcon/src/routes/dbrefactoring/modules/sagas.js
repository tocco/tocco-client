import {rest, notification} from 'tocco-app-extensions'
import {takeLatest, all, call, put, select, delay, spawn} from 'redux-saga/effects'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

const dbRefactoringSelector = state => state.dbRefactoring.dbRefactoring
const languageUpgradeSelector = state => state.dbRefactoring.languageUpgrade

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_MODULES, loadModules),
    takeLatest(actions.LOAD_FRAGMENTS, loadFragments),
    takeLatest(actions.EXECUTE_DB_REFACTORING, executeDbRefactoring),
    takeLatest(actions.EXECUTE_LANGUAGE_UPGRADE, executeLanguageUpgrade)
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

  const requestBody = {
    modules: selectedModules.map(module => module.key),
    fragments: selectedFragments,
    version,
    ignoreErrors
  }

  yield call(requestExecution, requestBody, 'dbRefactoring')
}

export function* executeLanguageUpgrade() {
  const {language} = yield select(languageUpgradeSelector)

  const requestBody = {
    language
  }

  yield call(requestExecution, requestBody, 'languageUpgrade')
}

export function* requestExecution(requestBody, statePath) {
  const options = {
    method: 'POST',
    body: requestBody
  }

  try {
    const response = yield call(rest.requestSaga, 'devcon/dbrefactoring/executions', options)
    yield spawn(pollExecution, response.headers.get('Location'), statePath)
  } catch (e) {
    consoleLogger.logError('DB refactoring execution failed', e)
    yield put(notification.toaster({
      type: 'error',
      title: 'DB refactoring execution failed'
    }))
  }
}

export function* pollExecution(location, statePath) {
  yield delay(3000)
  const response = yield call(rest.requestSaga, location)
  const state = response.body.state.toLowerCase()
  if (state === 'completed') {
    yield put(actions.unsetRunning(statePath))
    yield put(notification.toaster({
      type: 'success',
      title: 'DB refactoring execution completed'
    }))
  } else if (state === 'failed') {
    yield put(actions.unsetRunning(statePath))
    yield put(notification.toaster({
      type: 'error',
      title: 'DB refactoring execution failed'
    }))
  } else {
    yield call(pollExecution, location)
  }
}
