import consoleLogger from '../consoleLogger'
import {call} from 'redux-saga/effects'

let events = {}

export const FIRE_EXTERNAL_EVENT = 'FIRE_EXTERNAL_EVENT'

export const fireExternalEvent = (name, payload) => ({
  type: FIRE_EXTERNAL_EVENT,
  payload: {
    name,
    payload
  }
})

export const registerEvents = externalEvents => {
  events = {...events, ...externalEvents}
}

export const invokeExternalEvent = (eventName, ...args) => {
  if (__DEV__) {
    consoleLogger.log('try call external event', eventName)
  }

  if (events[eventName]) {
    events[eventName](...args)
  }
}

export function* fireExternalEventSaga(action) {
  const {name, payload} = action.payload
  yield call(invokeExternalEvent, name, payload)
}

export const getEvents = () => {
  return Object.keys(events)
}
