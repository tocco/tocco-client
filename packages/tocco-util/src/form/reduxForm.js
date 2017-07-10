import _forOwn from 'lodash/forOwn'
import _isEqual from 'lodash/isEqual'

import {generalErrorField} from './formErrors'

const wholeEntityField = '___entity'

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
      const transformedKey = transformFieldNameBack(key)
      const type = entity.paths[key].type
      if (type === 'field') {
        result.paths[transformedKey] = values[key]
      } else if (type === 'entity') {
        result.paths[transformedKey] = values[key] && values[key].key ? {key: values[key].key} : null
      } else if (type === 'entity-list') {
        result.paths[transformedKey] = values[key] ? values[key].map(value => ({'key': value.key})) : []
      }
    }
  })
  return result
}

// workaround: redux-forms can't get the value of a field if the field-name contains a dot.
export const transformFieldName = fieldName => (fieldName.replace('.', '--'))
export const transformFieldNameBack = fieldName => (fieldName.replace('--', '.'))

export const entityToFormValues = entity => {
  if (!entity || !entity.paths) return {}
  const result = {}
  const paths = entity.paths

  Object.keys(entity.paths).forEach(key => {
    const field = paths[key]
    if (field.type === 'entity' || field.type === 'entity-list' || field.type === 'display-expression') {
      result[transformFieldName(key)] = field.value
    } else {
      result[transformFieldName(key)] = field.value ? field.value.value : null
    }
  })

  result[wholeEntityField] = entity
  return result
}

export const getDirtyFields = (initialValues, values) => {
  const dirtyFields = []

  _forOwn(initialValues, (value, key) => {
    if (!_isEqual(value, values[key])) {
      dirtyFields.push(key)
    }
  })

  return dirtyFields
}
