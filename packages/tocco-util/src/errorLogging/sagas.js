import {fork, takeEvery} from 'redux-saga/effects'
import * as actions from './actions'
import handlerRegistry from './handlerRegistry'
export default function* sagas() {
  yield [
    fork(takeEvery, actions.LOG_ERROR, log)
  ]
}

export function* log({payload}) {
  const {type, title, description, error} = payload

  for (const handler in handlerRegistry) {
    try {
      yield handlerRegistry[handler](type, title, description, error)
    } catch (e) {
      console.log('Error in logger', e)
    }
  }
}
