import {reducer as form} from 'redux-form'
import {reducer as reducerUtil} from 'tocco-util'

import reducer from './modules/reducer'
import sagas from './modules/sagas'

export default store => {
  reducerUtil.injectReducers(store, {templateValues: reducer})
  reducerUtil.injectReducers(store, {form})
  store.sagaMiddleware.run(sagas)
}
