import appFactory from '../appFactory'
import reducer from './relationEntities/reducer'
import sagas from './relationEntities/sagas'

export const relationEntitiesSelector = store => store.formData.relationEntities

export const addToStore = (store, config) => {
  appFactory.injectReducers(store, {formData: reducer})
  store.sagaMiddleware.run(sagas, config)
}
