import {all, call, put} from 'redux-saga/effects'

import consoleLogger from '../consoleLogger'
import {abortController} from './abortController'

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
        if (abortController.signal.aborted === false) {
          if (logErrorAction) {
            yield put(logErrorAction('client.common.unexpectedError', 'client.common.unexpectedError', error))
          } else {
            consoleLogger.logError('error', error)
          }
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
