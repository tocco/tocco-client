import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {combineReducers} from 'redux'
import {reducer as reducerUtil} from 'tocco-util'

import advancedSearchSagas from './advancedSearch/sagas'
import locations from './locations/reducer'
import locationSagas from './locations/sagas'
import {setNavigationStrategy} from './navigationStrategy/actions'
import navigationStrategy from './navigationStrategy/reducer'
import {setRelationEntities} from './relationEntities/actions'
import relationEntities from './relationEntities/reducer'
import relationEntitiesSagas from './relationEntities/sagas'
import remoteCreateSagas from './remoteCreate/sagas'
import searchFilters from './searchFilters/reducer'
import searchFilterSagas from './searchFilters/sagas'
import tooltips from './tooltips/reducer'
import tooltipsSaga from './tooltips/sagas'
import {setChooseDocument} from './upload/actions'
import upload from './upload/reducer'
import uploadSagas from './upload/sagas'
import valueSagas from './values/sagas'

export const relationEntitiesSelector = store => store.formData.relationEntities.data
export const tooltipSelector = store => store.formData.tooltips.data
export const locationSuggestionsSelector = store => store.formData.locations

export const addToStore = (store, config) => {
  reducerUtil.injectReducers(store, {
    formData: combineReducers({
      relationEntities,
      tooltips,
      searchFilters,
      locations,
      navigationStrategy,
      upload
    })
  })

  store.sagaMiddleware.run(relationEntitiesSagas)
  store.sagaMiddleware.run(tooltipsSaga)
  store.sagaMiddleware.run(advancedSearchSagas, config)
  store.sagaMiddleware.run(valueSagas)
  store.sagaMiddleware.run(uploadSagas)
  store.sagaMiddleware.run(searchFilterSagas)
  store.sagaMiddleware.run(locationSagas)
  store.sagaMiddleware.run(remoteCreateSagas, config)

  if (config.navigationStrategy) {
    store.dispatch(setNavigationStrategy(config.navigationStrategy))
  }
  if (config.chooseDocument) {
    store.dispatch(setChooseDocument(config.chooseDocument))
  }

  const relationEntitiesData = _get(config, 'data.relationEntities', null)
  if (relationEntitiesData !== null) {
    Object.keys(relationEntitiesData).forEach(field => {
      store.dispatch(setRelationEntities(field, relationEntitiesData[field], false))
    })
  }
}

export const formDataPropType = PropTypes.shape({
  relationEntities: PropTypes.objectOf(PropTypes.array)
})
