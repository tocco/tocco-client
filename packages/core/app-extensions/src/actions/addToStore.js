import {saga as sagasUtil, reducer as reducerUtil} from 'tocco-util'

import errorLoging from '../errorLogging'
import dynamicActionsReducer from './modules/dynamicActions/reducer'
import dynamicActionsSagas from './modules/dynamicActions/sagas'
import reducer from './modules/reducer'
import sagas from './modules/sagas'

export default (store, config) => {
  reducerUtil.injectReducers(store, {actions: reducer})
  store.sagaMiddleware.run(sagasUtil.autoRestartSaga(sagas, config, errorLoging.logError))
}

export const dynamicActionsAddToStore = store => {
  reducerUtil.injectReducers(store, {dynamicActions: dynamicActionsReducer})

  store.sagaMiddleware.run(dynamicActionsSagas)
}
