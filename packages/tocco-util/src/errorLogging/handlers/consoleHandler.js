import {call} from 'redux-saga/effects'
import consoleLogger from '../../consoleLogger'

export default function* consoleLog(type, title, description, error) {
  yield call(consoleLogger.logError, `${title}: \n${description}\n`, error)
}
