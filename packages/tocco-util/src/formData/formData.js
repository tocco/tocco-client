import appFactory from '../appFactory'
import reducer from './relationEntities/reducer'
import relationEntitiesSagas from './relationEntities/sagas'
import advancedSearchSagas from './advancedSearch/sagas'

export const relationEntitiesSelector = store => store.formData.relationEntities

export const addToStore = (store, config) => {
  appFactory.injectReducers(store, {formData: reducer})
  store.sagaMiddleware.run(relationEntitiesSagas, config)
  store.sagaMiddleware.run(advancedSearchSagas, config)
}
