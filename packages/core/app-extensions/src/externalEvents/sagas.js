import {takeEvery, call, all, select, put} from 'redux-saga/effects'

import * as actions from './actions'
import {invokeExternalEvent} from './externalEvents'

export default function* sagas(configSelector) {
  yield all([
    takeEvery(actions.FIRE_EXTERNAL_EVENT, fireExternalEvent, configSelector),
    takeEvery(actions.FIRE_EXTERNAL_EVENT, fireMappedExternalEvent, configSelector),
    takeEvery(actions.FIRE_STATE_CHANGE_EVENT, fireStateChangeEvent)
  ])
}

export function* selectConfig(configSelector) {
  const config = yield select(configSelector)
  if (config) {
    return typeof config?.events === 'object' ? config : {events: config}
  }

  return null
}

export function* fireExternalEvent(configSelector, action) {
  const {name, payload} = action.payload
  const {events} = yield call(selectConfig, configSelector)
  yield call(invokeExternalEvent, events, name, payload)
}

function getMappedEvent(eventConfig, payload) {
  if (typeof eventConfig === 'string') {
    return {name: eventConfig, payload}
  }
  if (typeof eventConfig === 'function') {
    return eventConfig(payload)
  }
  return eventConfig
}

export function* fireMappedExternalEvent(configSelector, action) {
  const {name, payload} = action.payload
  const {eventMap} = yield call(selectConfig, configSelector)

  const hasMappedEvent = eventMap && ['string', 'function', 'object'].includes(typeof eventMap[name])
  if (hasMappedEvent) {
    const mappedEvent = getMappedEvent(eventMap[name], payload)
    yield put(actions.fireExternalEvent(mappedEvent.name, mappedEvent.payload))
  }
}

export function* fireStateChangeEvent({payload}) {
  yield put(actions.fireExternalEvent('onStateChange', payload))
}
