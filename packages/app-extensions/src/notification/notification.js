import sagas from './sagas'
import {connectSocket} from './actions'

export const addToStore = (store, config) => {
  store.sagaMiddleware.run(sagas, config)

  store.dispatch(connectSocket())
}
