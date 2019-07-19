import _forOwn from 'lodash/forOwn'
import _isEqual from 'lodash/isEqual'
import _pick from 'lodash/pick'
import _isEmpty from 'lodash/isEmpty'

import {generalErrorField, entityValidatorErrorsField, relatedEntityErrorsField} from './formErrors'

const versionField = '__version'

export const validationErrorToFormError = (entity, errors) => {
  let result = {[generalErrorField]: {[relatedEntityErrorsField]: []}}

  if (!errors) return result
  errors.forEach(error => {
    if (error.model === entity.model && error.key === entity.key) {
      result = {...result, ...error.paths}
      if (error.hasOwnProperty(entityValidatorErrorsField)) {
        result[generalErrorField][entityValidatorErrorsField] = error[entityValidatorErrorsField]
      }
    } else {
      result[generalErrorField][relatedEntityErrorsField].push(error)
    }
  })
  return result
}

export const formValuesToEntity = (values, dirtyFields, entityName, entityId, entityModel) => {
  const entity = {
    model: entityName,
    paths: {},
    key: entityId,
    version: values[versionField]
  }

  const ignoreField = fieldName => (fieldName === versionField || (dirtyFields && !dirtyFields.includes(fieldName)))

  Object.keys(values).forEach(key => {
    if (!ignoreField(key)) {
      const transformedKey = transformFieldNameBack(key)
      const type = getType(key, entityModel)
      if (type === 'field') {
        entity.paths[transformedKey] = values[key]
      } else if (type === 'entity') {
        entity.paths[transformedKey] = values[key] && values[key].key ? {key: values[key].key} : null
      } else if (type === 'entity-list') {
        entity.paths[transformedKey] = values[key] ? values[key].map(value => ({'key': value.key})) : []
      }
    }
  })
  return entity
}

const getType = (fieldName, entityModel) => {
  const modelField = entityModel[fieldName]
  if (modelField && modelField.relationName) {
    return modelField.multi ? 'entity-list' : 'entity'
  }
  return 'field'
}

// workaround: redux-forms can't get the value of a field if the field-name contains a dot.
export const transformFieldName = fieldName => (fieldName.replace(/\./g, '--'))
export const transformFieldNameBack = fieldName => (fieldName.replace(/--/g, '.'))

export const entityToFormValues = entity => {
  if (!entity || !entity.paths) return {}

  const result = {
    [versionField]: entity.version
  }

  Object.keys(entity.paths).forEach(key => {
    const field = entity.paths[key]
    const transformedFieldName = transformFieldName(key)
    const typeValueTransformer = typeValueTransformers[field.type]

    const value = field.value

    if (!value || _isEmpty(value)) {
      result[transformedFieldName] = null
    } else {
      result[transformedFieldName] = typeValueTransformer
        ? typeValueTransformer(value)
        : value.value || null
    }
  })

  return result
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

const relevantRelationAttributes = ['key', 'display']
const typeValueTransformers = {
  'display-expression': value => value,
  'entity': value => _pick(value, relevantRelationAttributes),
  'entity-list': value => value.map(childValue => _pick(childValue, relevantRelationAttributes))
}
