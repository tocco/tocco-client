import {combineReducers} from 'redux'
import PropTypes from 'prop-types'
import {reducer as reducerUtil} from 'tocco-util'

import relationEntities from './relationEntities/reducer'
import tooltips from './tooltips/reducer'
import relationEntitiesSagas from './relationEntities/sagas'
import tooltipsSaga from './tooltips/sagas'
import advancedSearchSagas from './advancedSearch/sagas'
import {setRelationEntities} from './relationEntities/actions'
export const relationEntitiesSelector = store => store.formData.relationEntities.data
export const tooltipSelector = store => store.formData.tooltips.data

export const addToStore = (store, values) => {
  reducerUtil.injectReducers(store, {formData: combineReducers({relationEntities, tooltips})})

  store.sagaMiddleware.run(relationEntitiesSagas)
  store.sagaMiddleware.run(tooltipsSaga)
  store.sagaMiddleware.run(advancedSearchSagas)

  if (values && values.relationEntities) {
    Object.keys(values.relationEntities).forEach(field => {
      store.dispatch(setRelationEntities(field, values.relationEntities[field], false))
    })
  }
}

export const formDataPropType = PropTypes.shape({
  relationEntities: PropTypes.objectOf(PropTypes.array)
})
