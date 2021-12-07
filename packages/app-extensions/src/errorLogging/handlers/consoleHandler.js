import {call} from 'redux-saga/effects'
import {consoleLogger} from 'tocco-util'

export default function* consoleLog(title, description, error) {
  yield call(consoleLogger.logError, `${title}: \n${description}\n`, error)
}
