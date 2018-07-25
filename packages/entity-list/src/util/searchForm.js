import {call} from 'redux-saga/effects'
import _get from 'lodash/get'
import _join from 'lodash/join'
import {fetchEntities} from 'tocco-util/src/rest'

export function* getPreselectedValues(preselectedSearchFields, entityModel, loadRelationEntity, searchFormVisible) {
  const formValues = {}
  for (const preselectedSearchField of preselectedSearchFields) {
    const fieldName = preselectedSearchField.id
    const value = preselectedSearchField.value

    let transformedValue
    if (entityModel[fieldName] && entityModel[fieldName].type === 'relation') {
      let entities = []
      if (!preselectedSearchField.hidden && searchFormVisible) {
        const targetEntity = entityModel[fieldName].targetEntity
        const query = `IN(pk,${_join(value, ',')})`
        entities = yield call(fetchEntities, targetEntity, {query, fields: ['pk']})
      }
      transformedValue = entities
    } else {
      transformedValue = value
    }

    formValues[fieldName] = transformedValue
  }

  return formValues
}

export const NOT_FOUND_DISPLAY = '??'
export const getDisplay = (key, entities) => _get(entities.find(e => e.key === key), 'display', NOT_FOUND_DISPLAY)
