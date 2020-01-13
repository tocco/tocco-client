import _get from 'lodash/get'
import {call} from 'redux-saga/effects'

import rest from '../rest'

function* loadDisplays(fields, entityModel) {
  const displayRequest = fields.reduce((acc, field) => {
    const {id, value} = field
    const fieldModel = _get(entityModel, ['paths', id])
    if (fieldModel && fieldModel.type === 'relation') {
      const targetEntity = fieldModel.targetEntity
      const arrayValue = Array.isArray(value) ? value : [value]

      return {
        ...acc,
        [targetEntity]: [
          ...(acc[targetEntity] || []),
          ...arrayValue
        ]
      }
    }
    return acc
  }
  , {})

  if (Object.keys(displayRequest).length === 0) {
    return null
  }

  return yield call(rest.fetchDisplays, displayRequest)
}

export const NOT_FOUND_DISPLAY = '??'
const relationFieldTransformer = (value, displays, targetEntity) =>
  ({key: value, display: _get(displays, [targetEntity, value], NOT_FOUND_DISPLAY)})

const fieldTypeTransformer = (value, fieldModel, displays) => {
  if (fieldModel && fieldModel.type === 'relation') {
    const {targetEntity} = fieldModel

    if (fieldModel.multi) {
      return value.map(v => relationFieldTransformer(v, displays, targetEntity))
    } else {
      return relationFieldTransformer(value, displays, targetEntity)
    }
  }

  return value
}

/**
 * Takes an array of values and transforms it into usable form values and load displays where needed.
 *
 * @param {array} fields Input array with schema [{id: 'firstname', value: 'Donald'}, {id: 'relGender', value: '1'}]
 * @param {entityModel} entityModel
 *
 * @return {object} With schema {firstname: 'Donald', relGender: {key: '1', display: 'Male'}}
 */
export default function* transformInputValues(fields, entityModel) {
  const displays = yield call(loadDisplays, fields, entityModel)

  return fields.reduce((acc, field) => {
    const {id, value} = field
    const fieldModel = _get(entityModel, ['paths', id])

    return {
      ...acc,
      [id]: fieldTypeTransformer(value, fieldModel, displays)
    }
  }, {})
}
