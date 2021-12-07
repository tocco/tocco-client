import * as actions from './actions'
import moduleSagas from './sagas'

export default {
  addToStore: store => {
    store.sagaMiddleware.run(moduleSagas)
  },
  actions
}
