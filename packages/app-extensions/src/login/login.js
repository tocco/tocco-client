import {reducer as reducerUtil} from 'tocco-util'

import reducer from './reducer'
import sagas from './sagas'

export const addToStore = store => {
  reducerUtil.injectReducers(
    store,
    {
      login: reducer
    }
  )

  store.sagaMiddleware.run(sagas)
}
