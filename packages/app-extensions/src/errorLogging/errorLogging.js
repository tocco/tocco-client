import {reducer as reducerUtil} from 'tocco-util'

import errorLoggingReducer from './reducer'
import sagas from './sagas'

export const addToStore = (store, accept, handlers = []) => {
  if (accept) {
    reducerUtil.injectReducers(store, {errorLogging: errorLoggingReducer})
  }

  store.sagaMiddleware.run(sagas, accept, handlers)
}
