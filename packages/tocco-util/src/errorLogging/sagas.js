import {takeEvery, call, put} from 'redux-saga/effects'
import * as actions from './actions'
import handlerRegistry from './handlerRegistry'
import consoleLogger from '../consoleLogger'
import actionEmitter from '../actionEmitter'

export default function* sagas(accept, handlers) {
  if (accept) {
    yield takeEvery(actions.LOG_ERROR, handleError, handlers)
  } else {
    yield takeEvery(actions.LOG_ERROR, emitError)
  }
}

export function* handleError(handlers, {payload}) {
  const {title, description, error} = payload
  for (const handlerIdx in handlers) {
    const handler = handlers[handlerIdx]
    try {
      yield call(handlerRegistry[handler], title, description, error)
    } catch (e) {
      consoleLogger.logError('Error in logger', e)
    }
  }
}

export function* emitError(action) {
  yield put(actionEmitter.emitAction(action))
}
