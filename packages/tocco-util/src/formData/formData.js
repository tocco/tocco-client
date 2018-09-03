import {combineReducers} from 'redux'

import appFactory from '../appFactory'
import relationEntities from './relationEntities/reducer'
import tooltips from './tooltips/reducer'
import relationEntitiesSagas from './relationEntities/sagas'
import tooltipsSaga from './tooltips/sagas'
import advancedSearchSagas from './advancedSearch/sagas'

export const relationEntitiesSelector = store => store.formData.relationEntities.data
export const tooltipSelector = store => store.formData.tooltips.data

export const addToStore = (store, config) => {
  appFactory.injectReducers(store, {formData: combineReducers({relationEntities, tooltips})})

  store.sagaMiddleware.run(relationEntitiesSagas, config)
  store.sagaMiddleware.run(tooltipsSaga, config)
  store.sagaMiddleware.run(advancedSearchSagas, config)
}
