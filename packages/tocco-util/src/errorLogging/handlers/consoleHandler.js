import {call} from 'redux-saga/effects'
import {logError} from '../../consoleLogger'

export default function* consoleLogger(type, title, description, error) {
  yield call(logError, `${title}: \n${description}\n`, error)
}
