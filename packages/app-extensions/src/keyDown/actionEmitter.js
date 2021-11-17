import {reducer as reducerUtil} from 'tocco-util'

import reducer from './reducer'
import sagas from './sagas'

export const addToStore = (store, config) => {
  reducerUtil.injectReducers(
    store,
    {
      keyDown: reducer
    }
  )

  store.sagaMiddleware.run(sagas, config)
}
