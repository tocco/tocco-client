import errorLoggingReducer from './reducer'
import storeFactory from '../storeFactory'
import sagas from './sagas'

export const addToStore = (store, accept, handlers = []) => {
  if (accept) {
    storeFactory.injectReducers(store, {errorLogging: errorLoggingReducer})
  }

  store.sagaMiddleware.run(sagas, accept, handlers)
}
