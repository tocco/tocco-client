import _reduce from 'lodash/reduce'
import _isEqual from 'lodash/isEqual'

const wholeEntityField = '___entity'

import {generalErrorField} from './formErrors'

export const validationErrorToFormError = (entity, errors) => {
  let result = {[generalErrorField]: {pathErrors: []}}
  if (!errors) return result
  errors.forEach(error => {
    if (error.model === entity.model && error.key === entity.key) {
      result = {...result, ...error.paths}
    } else {
      result[generalErrorField].pathErrors.push(error)
    }
  })
  return result
}

export const formValuesToEntity = (values, dirtyFields) => {
  const entity = values[wholeEntityField]
  const {model, version, key} = entity

  const result = {model, version, key, paths: {}}

  const ignoreField = fieldName => (fieldName === wholeEntityField || (dirtyFields && !dirtyFields.includes(fieldName)))

  Object.keys(values).forEach(key => {
    if (!ignoreField(key)) {
      const type = entity.paths[key].type
      if (type === 'field') {
        result.paths[key] = values[key]
      } else if (type === 'entity') {
        result.paths[key] = {key: values[key]}
      } else if (type === 'entity-list') {
        result.paths[key] = values[key].map(value => ({'key': value}))
      }
    }
  })
  return result
}

export const entityToFormValues = entity => {
  if (!entity || !entity.paths) return {}
  const result = {}
  const paths = entity.paths
  Object.keys(entity.paths).forEach(key => {
    if (paths[key].value != null) {
      if (paths[key].type === 'entity') {
        result[key] = paths[key].value.key
      } else if (paths[key].type === 'entity-list') {
        result[key] = paths[key].value.map(e => e.key)
      } else {
        result[key] = paths[key].value.value
      }
    }
  })

  result[wholeEntityField] = entity
  return result
}

export const getDirtyFields = (initialValues, values) => (
  _reduce(
    initialValues,
    (result, value, key) => _isEqual(value, values[key]) ? result : result.concat(key),
    []
  )
)

