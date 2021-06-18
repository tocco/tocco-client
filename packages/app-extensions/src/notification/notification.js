import {combineReducers} from 'redux'
import {reducer as reducerUtil} from 'tocco-util'

import blockingReducer from './modules/blocking/reducer'
import blockingSagas from './modules/blocking/sagas'
import interactiveSagas from './modules/interactive/sagas'
import modalReducer from './modules/modal/reducer'
import modalSagas from './modules/modal/sagas'
import socketReducer from './modules/socket/reducer'
import socketSagas from './modules/socket/sagas'
import toasterReducer from './modules/toaster/reducer'
import toasterSagas from './modules/toaster/sagas'
import centerSagas from './modules/center/sagas'
import centerReducer from './modules/center/reducer'

export const addToStore = (store, accept) => {
  if (accept) {
    reducerUtil.injectReducers(
      store,
      {
        notification: combineReducers({
          modal: modalReducer,
          socket: socketReducer,
          toaster: toasterReducer,
          blocking: blockingReducer,
          center: centerReducer
        })
      }
    )
  }

  store.sagaMiddleware.run(blockingSagas, accept)
  store.sagaMiddleware.run(interactiveSagas, accept)
  store.sagaMiddleware.run(modalSagas, accept)
  store.sagaMiddleware.run(socketSagas, accept)
  store.sagaMiddleware.run(toasterSagas, accept)
  if (accept) {
    store.sagaMiddleware.run(centerSagas)
  }
}
