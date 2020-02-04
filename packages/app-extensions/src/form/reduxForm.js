import _forOwn from 'lodash/forOwn'
import _isEqual from 'lodash/isEqual'
import _reduce from 'lodash/reduce'

import {generalErrorField, entityValidatorErrorsField, relatedEntityErrorsField} from './formErrors'

export const validationErrorToFormError = (entity, errors) => {
  let result = {[generalErrorField]: {[relatedEntityErrorsField]: []}}

  if (!errors) return result
  errors.forEach(error => {
    if (error.model === entity.model && ((!entity.key && !error.key) || error.key === entity.key)) {
      result = {...result, ...error.paths}
      if (Object.prototype.hasOwnProperty.call(error, entityValidatorErrorsField)) {
        result[generalErrorField][entityValidatorErrorsField] = error[entityValidatorErrorsField]
      }
    } else {
      result[generalErrorField][relatedEntityErrorsField].push(error)
    }
  })
  return result
}

// workaround: redux-forms can't get the value of a field if the field-name contains a dot.
export const transformFieldName = fieldName => (fieldName.replace(/\./g, '--'))
export const transformFieldNameBack = fieldName => (fieldName.replace(/--/g, '.'))

export const entityToFormValues = entity => {
  return _reduce(entity, (acc, val, key) => ({...acc, [transformFieldName(key)]: val}), {})
}

export const formValuesToFlattenEntity = entity => {
  return _reduce(entity, (acc, val, key) => ({...acc, [transformFieldNameBack(key)]: val}), {})
}

export const getDirtyFields = (initialValues, values, isCreate) => {
  const dirtyFields = []

  _forOwn(values, (value, key) => {
    if (isCreate || !_isEqual(value, initialValues[key])) {
      dirtyFields.push(key)
    }
  })

  return dirtyFields
}
