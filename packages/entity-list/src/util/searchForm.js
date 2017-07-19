import {call} from 'redux-saga/effects'
import {loadRelationEntity as loadRelationEntityAction} from '../modules/searchForm/actions'

export function* getInitialFromValues(preselectedSearchFields, entityModel, loadRelationEntity) {
  const formValues = {}
  for (const preselectedSearchField of preselectedSearchFields) {
    const fieldName = preselectedSearchField.id
    const value = preselectedSearchField.value

    let transformedValue
    if (entityModel[fieldName] && entityModel[fieldName].type === 'relation') {
      const targetEntity = entityModel[fieldName].targetEntity
      const entities = yield call(loadRelationEntity, loadRelationEntityAction(targetEntity))

      if (Array.isArray(value)) {
        transformedValue = value.map(v => entities.find(e => e.key === v))
      } else {
        transformedValue = entities.find(e => e.key === value)
      }
    } else {
      transformedValue = value
    }

    formValues[fieldName] = transformedValue
  }

  return formValues
}
