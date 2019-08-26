import {consoleLogger} from 'tocco-util'
import {call} from 'redux-saga/effects'

export default function* consoleLog(title, description, error) {
  yield call(consoleLogger.logError, `${title}: \n${description}\n`, error)
}
