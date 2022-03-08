import {takeEvery, all, put, call} from 'redux-saga/effects'

import * as actions from './actions'

export default function* sagas(config) {
  yield all([call(init, config), takeEvery(actions.KEY_DOWN, emitAction)])
}

export function* init(config) {
  yield put(actions.setConfig(config))
}

export function* emitAction({payload}) {
  const {config} = payload

  if (config) {
    yield all(config.actions.map(action => put(action)))
  }
}
