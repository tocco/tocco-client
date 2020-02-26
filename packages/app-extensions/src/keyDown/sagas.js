import {takeEvery, all, put} from 'redux-saga/effects'

import * as actions from './actions'

export default function* sagas(configs) {
  yield all([
    takeEvery(actions.KEY_DOWN, emitAction, configs)
  ])
}

export function* emitAction(configs, {payload}) {
  const {event} = payload
  const config = configs.find(
    config =>
      config.key === event.key
      && (!config.ctrl || (event.ctrlKey || event.metaKey))
      && event.global === config.global
  )

  if (config) {
    yield all(config.actions.map(action => put(action)))
  }
}
