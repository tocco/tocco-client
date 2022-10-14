import _forOwn from 'lodash/forOwn'
import _isEqual from 'lodash/isEqual'
import _omit from 'lodash/omit'
import _reduce from 'lodash/reduce'
import {api} from 'tocco-util'

import componentTypes from './enums/componentTypes'
import {typeFieldMapping} from './formDefinition'
import {generalErrorField, entityValidatorErrorsField, relatedEntityErrorsField} from './formErrors'

const isEmpty = obj => Object.keys(obj).length === 0

/**
 * Applies type field mapping to map real error fields to form related (virtual) error fields.
 *
 * @param {object} errors
 * @param {array} fieldDefinitions
 * @returns errors
 */
const mapErrorsToFormErrors = (errors, fieldDefinitions) =>
  fieldDefinitions
    .filter(field => field.componentType === componentTypes.FIELD)
    .reduce((acc, field) => {
      if (typeFieldMapping[field.dataType]) {
        const {paths} = typeFieldMapping[field.dataType](field)
        const fieldError = {
          ...paths.reduce((err, p) => ({...err, ...acc[p]}), {})
        }
        return {
          ...acc,
          ...(!isEmpty(fieldError) ? {[field.path || field.id]: fieldError} : {})
        }
      }

      return acc
    }, errors)

export const validationErrorToFormError = (entity, fieldDefinitions, errors) => {
  let result = {[generalErrorField]: {[relatedEntityErrorsField]: []}}

  if (!errors) {
    return result
  }
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
  return mapErrorsToFormErrors(result, fieldDefinitions)
}

const DotEscapeCharacters = '--'
const OpenBracketEscapeCharacters = '=-='
const CloseBracketEscapeCharacters = '=_='

/**
 * Workaround:
 * redux-forms can't get the value of a field if the field-name contains
 *  - dots
 *  - brackets
 *    - used for selectors (e.g. relAddress[publication])
 */
export const transformFieldName = fieldName => {
  if (!fieldName) {
    return fieldName
  }

  return fieldName
    .replace(/\./g, DotEscapeCharacters)
    .replace(/\[/g, OpenBracketEscapeCharacters)
    .replace(/\]/g, CloseBracketEscapeCharacters)
}
export const transformFieldNameBack = fieldName => {
  if (!fieldName) {
    return fieldName
  }

  return fieldName
    .replace(new RegExp(DotEscapeCharacters, 'g'), '.')
    .replace(new RegExp(OpenBracketEscapeCharacters, 'g'), '[')
    .replace(new RegExp(CloseBracketEscapeCharacters, 'g'), ']')
}

/**
 * Applies type field mapping to map real fields to form related (virtual) fields.
 *
 * @param {object} values
 * @param {array} fieldDefinitions
 * @returns values
 */
const mapEntityToFormValues = (values, fieldDefinitions) =>
  fieldDefinitions
    .filter(field => field.componentType === componentTypes.FIELD)
    .reduce((acc, field) => {
      if (typeFieldMapping[field.dataType]) {
        const {mapping} = typeFieldMapping[field.dataType](field)
        const fieldValue = {
          ...Object.keys(mapping).reduce((vals, key) => {
            const path = mapping[key]
            return {...vals, ...(acc[path] ? {[key]: acc[path]} : {})}
          }, {})
        }
        return {
          ...acc,
          ...(!isEmpty(fieldValue) ? {[field.path || field.id]: fieldValue} : {})
        }
      }

      return acc
    }, values)

export const entityToFormValues = (entity, fieldDefinitions) => {
  const values = _reduce(entity, (acc, val, key) => ({...acc, [transformFieldName(key)]: val}), {})
  return mapEntityToFormValues(values, fieldDefinitions)
}

/**
 * Applies type field mapping to map form related (virtual) fields to real fields.
 *
 * @param {object} flattenEntity
 * @param {array} fieldDefinitions
 * @returns flattenEntity
 */
const mapFormValuesToEntity = (entity, fieldDefinitions) =>
  fieldDefinitions
    .filter(field => field.componentType === componentTypes.FIELD)
    .reduce((acc, field) => {
      if (typeFieldMapping[field.dataType]) {
        const {mapping} = typeFieldMapping[field.dataType](field)
        const fieldValue = acc[field.path || field.id]

        const fieldValues = fieldValue
          ? {
              ...Object.keys(mapping).reduce((vals, key) => {
                const path = mapping[key]
                return {
                  ...vals,
                  ...(fieldValue[key] ? {[path]: fieldValue[key]} : {})
                }
              }, {})
            }
          : {}

        return {
          ..._omit(acc, field.path || field.id), // remove virtual field
          ...(!isEmpty(fieldValues) ? fieldValues : {})
        }
      }

      return acc
    }, entity)

export const formValuesToFlattenEntity = (formValues, fieldDefinitions) => {
  const flattenEntity = _reduce(formValues, (acc, val, key) => ({...acc, [transformFieldNameBack(key)]: val}), {})
  return mapFormValuesToEntity(flattenEntity, fieldDefinitions)
}

const getDirtyFields = (initialValues, values, isCreate) => {
  const dirtyFields = []

  _forOwn(values, (value, key) => {
    if (isCreate || !_isEqual(value, initialValues[key])) {
      dirtyFields.push(key)
    }
  })

  return dirtyFields
}

export const getDirtyFormValues = (initialValues, values, isCreate) => {
  const dirtyPaths = getDirtyFields(initialValues, values, isCreate)
  return Object.keys(values).reduce((obj, key) => {
    const includedKey =
      Object.values(api.metaFields).includes(key) ||
      dirtyPaths.some(dirtyPath => dirtyPath === key || dirtyPath.startsWith(`${key}${DotEscapeCharacters}`))

    return includedKey
      ? {
          ...obj,
          [key]: values[key]
        }
      : obj
  }, {})
}

export const isValueEmpty = v =>
  v === null ||
  v === undefined ||
  v === '' ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === 'object' && Object.keys(v).length === 0)
