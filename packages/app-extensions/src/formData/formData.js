import {combineReducers} from 'redux'
import PropTypes from 'prop-types'
import {reducer as reducerUtil} from 'tocco-util'
import _get from 'lodash/get'

import relationEntities from './relationEntities/reducer'
import tooltips from './tooltips/reducer'
import relationEntitiesSagas from './relationEntities/sagas'
import tooltipsSaga from './tooltips/sagas'
import advancedSearchSagas from './advancedSearch/sagas'
import valueSagas from './values/sagas'
import uploadSagas from './upload/sagas'
import {setRelationEntities} from './relationEntities/actions'
export const relationEntitiesSelector = store => store.formData.relationEntities.data
export const tooltipSelector = store => store.formData.tooltips.data

export const addToStore = (store, config) => {
  reducerUtil.injectReducers(store, {formData: combineReducers({relationEntities, tooltips})})

  store.sagaMiddleware.run(relationEntitiesSagas)
  store.sagaMiddleware.run(tooltipsSaga)
  store.sagaMiddleware.run(advancedSearchSagas, config)
  store.sagaMiddleware.run(valueSagas)
  store.sagaMiddleware.run(uploadSagas)

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
