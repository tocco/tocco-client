import _get from 'lodash/get'
import _join from 'lodash/join'
import _pick from 'lodash/pick'

import rest from '../rest'

import {call} from 'redux-saga/effects'

export function* fetchEntities(entity, ids) {
  const query = {
    paths: ['pk'],
    tql: `IN(pk, ${_join(ids, ',')})`
  }

  return yield call(rest.fetchEntities, entity, query, {}, v => v.data.map(e => _pick(e, ['display', 'key'])))
}

export default function* loadDisplaysOfRelationFields(fields, entityModel) {
  const result = {}
  if (fields) {
    for (const field of fields) {
      const {id, value} = field
      let transformedValue = value

      const fieldModel = entityModel[id]
      if (fieldModel && fieldModel.type === 'relation') {
        const targetEntity = fieldModel.targetEntity

        if (fieldModel.multi) {
          transformedValue = yield call(fetchEntities, targetEntity, value)
        } else {
          const entities = yield call(fetchEntities, targetEntity, [value])
          transformedValue = entities[0]
        }
      }
      result[id] = transformedValue
    }
    return result
  }
}

export const NOT_FOUND_DISPLAY = '??'
export const getDisplay = (key, entities) => _get(entities.find(e => e.key === key), 'display', NOT_FOUND_DISPLAY)
