import {saga as sagasUtil, reducer as reducerUtil} from 'tocco-util'

import errorLoging from '../errorLogging'
import reducer from './modules/reducer'
import sagas from './modules/sagas'

export default (store, config) => {
  reducerUtil.injectReducers(store, {actions: reducer})
  store.sagaMiddleware.run(sagasUtil.autoRestartSaga(sagas, config, errorLoging.logError))
}
