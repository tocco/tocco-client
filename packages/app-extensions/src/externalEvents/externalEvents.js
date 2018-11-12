import {consoleLogger} from 'tocco-util'

import sagas from './sagas'

export const invokeExternalEvent = (events = {}, eventName, ...args) => {
  if (__DEV__) {
    consoleLogger.log('try call external event:', eventName, 'args:', ...args)
  }

  if (events[eventName]) {
    events[eventName](...args)
  }
}

export const addToStore = (store, events) => {
  store.sagaMiddleware.run(sagas, events)
}
