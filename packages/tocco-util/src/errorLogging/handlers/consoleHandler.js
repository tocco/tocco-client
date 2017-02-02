import {call} from 'redux-saga/effects'

export default function* consoleLogger(type, title, error) {
  if (window.console) {
    const logError = console.error || console.log
    yield call(logError, title + ': \n', error)
  }
}
