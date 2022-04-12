import {reducer as reducerUtil} from 'tocco-util'

import cacheReducer from './reducer'
import sagas from './sagas'

export const addToStore = store => {
  reducerUtil.injectReducers(store, {cache: cacheReducer})

  store.sagaMiddleware.run(sagas)
}
