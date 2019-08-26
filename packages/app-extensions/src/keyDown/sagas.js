import {fork, takeEvery, all, put} from 'redux-saga/effects'

import * as actions from './actions'

export default function* sagas(configs) {
  yield all([
    fork(takeEvery, actions.KEY_DOWN, emitAction, configs)
  ])
}

export function* emitAction(configs, {payload}) {
  const {event} = payload

  yield all(
    configs
      .filter(config => config.key === event.key && (!config.ctrl || (event.ctrlKey || event.metaKey)))
      .map(config => put(config.action))
  )
}
