import _pick from 'lodash/pick'
import {all, call, put, delay} from 'redux-saga/effects'

import consoleLogger from '../consoleLogger'

/**
 * Sends a request to a location in a repetitive manner until the response has another status
 * than the one given by retryStatus.
 * @param {string} location Url that the request gets send to
 * @param {string} retryStatus As long as the body.status equals the retryStatus, the request gets repeated
 * @returns {object} response Request response
 */
export function* checkStatusLoop(requestSaga, location, retryStatus) {
  let delayer = 1
  while (true) {
    const response = yield call(requestSaga, location)
    if (response.body.status === retryStatus) {
      yield delay(500 * delayer)
      if (delayer < 10) delayer++
    } else {
      return response
    }
  }
}

/**
 * Starts the saga again if an exception is thrown
 * @param generator Saga
 * @param config Optional object with additional information
 * @param logErrorAction Action that gets dispatched in case of an exception
 * @returns {autoRestarting}
 */
export const autoRestartSaga = (generator, config, logErrorAction) => {
  return function* autoRestarting(...args) {
    while (true) {
      try {
        yield call(generator, config, ...args)
      } catch (error) {
        if (logErrorAction) {
          const errorObj = {..._pick(error, ['message', 'stack'])}
          yield put(logErrorAction('client.common.unexpectedError', 'client.common.unexpectedError', errorObj))
        } else {
          consoleLogger.logError('error', error)
        }
      }
    }
  }
}

/**
 * Transforms a list of sagas to a generator
 */
export const createGenerator = sagas => {
  return function* rootSaga() {
    yield all(sagas)
  }
}

/**
 * Add a saga to the store and runs it
 */
export const injectSaga = (store, saga, logErrorAction) => {
  if (!store.sagas.includes(saga)) {
    store.sagas.push(saga)
    store.sagaMiddleware.run(autoRestartSaga(saga, null, logErrorAction))
  }
}
