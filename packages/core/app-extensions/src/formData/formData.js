import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {combineReducers} from 'redux'
import {reducer as reducerUtil} from 'tocco-util'

import advancedSearchSagas from './advancedSearch/sagas'
import {setConfigSelector} from './config/actions'
import config from './config/reducer'
import locations from './locations/reducer'
import locationSagas from './locations/sagas'
import {setRelationEntities} from './relationEntities/actions'
import relationEntities from './relationEntities/reducer'
import relationEntitiesSagas from './relationEntities/sagas'
import remoteCreateSagas from './remoteCreate/sagas'
import searchFilters from './searchFilters/reducer'
import searchFilterSagas from './searchFilters/sagas'
import tooltips from './tooltips/reducer'
import tooltipsSaga from './tooltips/sagas'
import uploadSagas from './upload/sagas'
import valueSagas from './values/sagas'

export const relationEntitiesSelector = state => state.formData.relationEntities.data
export const tooltipSelector = state => state.formData.tooltips.data
export const locationSuggestionsSelector = state => state.formData.locations
export const formDataConfigSelector = state => {
  const configSelector = state.formData.config.configSelector
  return configSelector(state)
}

export const addToStore = (store, configSelector = () => ({})) => {
  reducerUtil.injectReducers(store, {
    formData: combineReducers({
      relationEntities,
      tooltips,
      searchFilters,
      locations,
      config
    })
  })

  store.sagaMiddleware.run(relationEntitiesSagas)
  store.sagaMiddleware.run(tooltipsSaga)
  store.sagaMiddleware.run(advancedSearchSagas, configSelector)
  store.sagaMiddleware.run(valueSagas)
  store.sagaMiddleware.run(uploadSagas)
  store.sagaMiddleware.run(searchFilterSagas)
  store.sagaMiddleware.run(locationSagas)
  store.sagaMiddleware.run(remoteCreateSagas, configSelector)

  store.dispatch(setConfigSelector(configSelector))

  const state = store.getState()
  const relationEntitiesData = _get(configSelector(state), 'initialData.relationEntities', null)
  if (relationEntitiesData !== null) {
    Object.keys(relationEntitiesData).forEach(field => {
      store.dispatch(setRelationEntities(field, relationEntitiesData[field], false, undefined))
    })
  }
}

export const formDataPropType = PropTypes.shape({
  relationEntities: PropTypes.objectOf(PropTypes.array)
})
