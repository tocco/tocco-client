import errorLoggingReducer from './reducer'
import appFactory from '../appFactory'
import sagas from './sagas'

export const addToStore = (store, accept, handlers = []) => {
  if (accept) {
    appFactory.injectReducers(store, {errorLogging: errorLoggingReducer})
  }

  store.sagaMiddleware.run(sagas, accept, handlers)
}
