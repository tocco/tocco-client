import moduleSagas from './sagas'
import * as actions from './actions'

export default {
  addToStore: store => {
    store.sagaMiddleware.run(moduleSagas)
  },
  actions
}
