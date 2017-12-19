import {call} from 'redux-saga/effects'
import _get from 'lodash/get'
import {loadRelationEntity as loadRelationEntityAction} from '../modules/searchForm/actions'

export function* getInitialFromValues(preselectedSearchFields, entityModel, loadRelationEntity) {
  const formValues = {}
  for (const preselectedSearchField of preselectedSearchFields) {
    const fieldName = preselectedSearchField.id
    const value = preselectedSearchField.value

    let transformedValue
    if (entityModel[fieldName] && entityModel[fieldName].type === 'relation') {
      let entities = []
      if (!preselectedSearchField.hidden) {
        const targetEntity = entityModel[fieldName].targetEntity
        entities = yield call(loadRelationEntity, loadRelationEntityAction(targetEntity))
      }

      if (Array.isArray(value)) {
        transformedValue = value.map(key => ({key, display: getDisplay(key, entities)}))
      } else {
        transformedValue = {key: value, display: getDisplay(value, entities)}
      }
    } else {
      transformedValue = value
    }

    formValues[fieldName] = transformedValue
  }

  return formValues
}

export const NOT_LOADED_DISPLAY = '..'
export const getDisplay = (key, entities) => _get(entities.find(e => e.key === key), 'display', NOT_LOADED_DISPLAY)
