import appFactory from '../appFactory'
import reducer from './modules/reducer'
import sagas from './modules/sagas'

export default (store, config) => {
  appFactory.injectReducers(store, {actions: reducer})
  store.sagaMiddleware.run(appFactory.autoRestartSaga(sagas, config))
}
