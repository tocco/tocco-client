import {call} from 'redux-saga/effects'
import {remoteLogger} from 'tocco-util'

export default function* remoteLoggerSaga(title, description, error) {
  yield call(remoteLogger.logException, error)
}
