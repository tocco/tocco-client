import {takeEvery, call, put, all} from 'redux-saga/effects'

import * as actions from './actions'
import handlerRegistry from './handlerRegistry'
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

  yield all(handlers.map(handler => call(handlerRegistry[handler], title, description, error)))
}

export function* emitError(action) {
  yield put(actionEmitter.emitAction(action))
}
