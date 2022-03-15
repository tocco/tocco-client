import {call} from 'redux-saga/effects'
import {api} from 'tocco-util'

import rest from '../rest'

export function* enhanceEntityWithDisplayExpressions(entity, formName, fieldDefinitions, mode) {
  const displayExpressions = fieldDefinitions.filter(f => f.componentType === 'display').map(f => f.id)
  const displayExpressionsL = yield call(loadDisplayExpressions, formName, mode, displayExpressions, [entity])
  if (displayExpressionsL) {
    Object.keys(displayExpressionsL[entity.__key]).forEach(dE => {
      entity[dE] = displayExpressionsL[entity.__key][dE]
    })
  }
}

function* loadDisplayExpressions(formName, mode, paths, entities) {
  if (paths && paths.length > 0) {
    const keys = entities.map(e => e.__key)
    const entityName = entities[0].__model
    return yield call(rest.fetchDisplayExpressions, formName, mode, keys, paths, entityName)
  }
}

export function* enhanceEntityWithDisplays(entity, fieldDefinitions) {
  const relationFields = fieldDefinitions.filter(f => api.relationFieldTypes.includes(f.dataType)).map(f => f.path)

  const displays = yield call(loadRelationDisplays, relationFields, [entity])

  relationFields.forEach(relationField => {
    const value = entity[relationField]
    if (value) {
      entity[relationField] = Array.isArray(value)
        ? value.filter(v => v !== null).map(v2 => ({...v2, display: displays[v2.model][v2.key]}))
        : {...value, display: displays[value.model][value.key]}
    }
  })
}

function* loadRelationDisplays(relationFields, entities) {
  if (relationFields && relationFields.length > 0) {
    const request = yield call(api.getPathDisplayRequest, entities, relationFields, {})
    return yield call(rest.fetchDisplays, request)
  }
}
