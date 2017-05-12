import {fork, takeEvery, call, all} from 'redux-saga/effects'
import * as actions from './actions'
import handlerRegistry from './handlerRegistry'
import consoleLogger from '../consoleLogger'
export default function* sagas(handlers) {
  yield all([
    fork(takeEvery, actions.LOG_ERROR, log, handlers)
  ])
}

export function* log(handlers, {payload}) {
  const {type, title, description, error} = payload

  for (const handlerIdx in handlers) {
    const handler = handlers[handlerIdx]
    try {
      yield call(handlerRegistry[handler], type, title, description, error)
    } catch (e) {
      consoleLogger.logError('Error in logger', e)
    }
  }
}
