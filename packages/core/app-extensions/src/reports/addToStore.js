import {reducer as reducerUtil} from 'tocco-util'

import reports from './reducer'
import reportsSagas from './sagas'

export default store => {
  reducerUtil.injectReducers(store, {reports})
  store.sagaMiddleware.run(reportsSagas)
}
