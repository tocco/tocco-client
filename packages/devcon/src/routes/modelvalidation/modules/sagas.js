import {socket, rest, notification} from 'tocco-app-extensions'
import {all, call, put, takeEvery, select} from 'redux-saga/effects'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'
import SqlDialog from '../components/SqlDialog'
import ChangelogDialog from '../components/ChangelogDialog'

const selectionSelector = state => state.modelValidation.selection
const sqlSelector = state => state.modelValidation.sql

export default function* mainSagas() {
  yield all([
    call(initSocket),
    takeEvery(actions.START_VALIDATION, startValidation),
    takeEvery(actions.RECEIVE_MESSAGE, receiveMessage),
    takeEvery(actions.GENERATE_SQL, generateSql),
    takeEvery(actions.EXECUTE_SQL, executeSql),
    takeEvery(actions.GENERATE_CHANGELOG, generateChangelog)
  ])
}

export function* initSocket() {
  const params = {
    name: 'modelvalidation',
    messageReceivedAction: actions.receiveMessage
  }
  yield call(socket.connectSocket, params)
}

export function* startValidation() {
  try {
    yield call(rest.requestSaga, 'devcon/modelvalidation/validation', {method: 'POST'})
  } catch (e) {
    consoleLogger.logError('Failed to start model validation', e)
    yield put(notification.toaster({
      type: 'error',
      title: 'Failed to start model validation'
    }))
  }
}

export function* receiveMessage({payload}) {
  switch (payload.message.type) {
    case 'validation_ended':
      yield put(actions.setResult(payload.message.params.result))
      break
    case 'entering_checks':
      yield put(actions.setTotal(payload.message.params.total))
      break
    case 'entering_check':
      yield put(actions.setCurrent(
        payload.message.params.total,
        payload.message.params.num,
        payload.message.params.model
      ))
      break
    case 'check_event':
      yield put(actions.addCheckEvent(
        payload.message.params.id,
        payload.message.params.type,
        payload.message.params.label
      ))
      break
  }
}

export function* generateSql() {
  const selection = yield select(selectionSelector)
  const options = {
    method: 'POST',
    body: {
      uuids: selection
    }
  }
  try {
    const response = yield call(rest.requestSaga, 'devcon/modelvalidation/sql', options)
    yield put(actions.setSql(response.body.statements.map(statement => statement + ';').join('\n')))
    yield put(notification.modal('sql', 'SQL', null, SqlDialog, true))
  } catch (e) {
    consoleLogger.logError('Failed to generate SQL', e)
    yield put(notification.toaster({
      type: 'error',
      title: 'Failed to generate SQL'
    }))
  }
}

export function* executeSql({payload}) {
  const sql = yield select(sqlSelector)
  const options = {
    method: 'POST',
    body: {
      statements: sql.split(';')
    }
  }
  try {
    const response = yield call(rest.requestSaga, 'devcon/modelvalidation/execute/sql', options)
    if (response.status === 200) {
      yield call(payload.close)
    }
  } catch (e) {
    consoleLogger.logError('Failed to execute SQL', e)
    yield put(notification.toaster({
      type: 'error',
      title: 'Failed to execute SQL'
    }))
  }
}

export function* generateChangelog() {
  const selection = yield select(selectionSelector)
  const options = {
    method: 'POST',
    body: {
      uuids: selection
    }
  }
  try {
    const response = yield call(rest.requestSaga, 'devcon/modelvalidation/changelog', options)
    yield put(actions.setChangelog(response.body.statements[0]))
    yield put(notification.modal('changelog', 'Changelog', null, ChangelogDialog, true))
  } catch (e) {
    consoleLogger.logError('Failed to generate Changelog', e)
    yield put(notification.toaster({
      type: 'error',
      title: 'Failed to generate changelog'
    }))
  }
}
