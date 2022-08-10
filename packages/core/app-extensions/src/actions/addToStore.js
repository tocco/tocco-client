import {saga as sagasUtil, reducer as reducerUtil} from 'tocco-util'

import errorLoging from '../errorLogging'
import dynamicActionsReducer from './modules/dynamicActions/reducer'
import dynamicActionsSagas from './modules/dynamicActions/sagas'
import sagas from './modules/sagas'

export default (store, configSelector = () => ({})) => {
  store.sagaMiddleware.run(sagasUtil.autoRestartSaga(sagas, configSelector, errorLoging.logError))
}

export const dynamicActionsAddToStore = store => {
  reducerUtil.injectReducers(store, {dynamicActions: dynamicActionsReducer})

  store.sagaMiddleware.run(dynamicActionsSagas)
}
