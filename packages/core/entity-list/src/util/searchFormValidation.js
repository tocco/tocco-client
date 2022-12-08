import _forOwn from 'lodash/forOwn'
import {FormattedMessage} from 'react-intl'
import {form} from 'tocco-app-extensions'

// TODO: TOCDEV-6433 - replace cache with object cache

export const validateSearchFields = (values, formDefinition) => {
  const errors = {}

  _forOwn(values, (value, fieldName) => {
    let fieldDefinition = fieldDefinitionCache.get(fieldName)
    if (!fieldDefinition) {
      fieldDefinition = getFieldDefinition(form.transformFieldNameBack(fieldName), formDefinition)
      fieldDefinitionCache.add(fieldName, fieldDefinition)
    }

    if (fieldDefinition) {
      const fieldErrors = validateField(value, fieldDefinition)
      if (fieldErrors) {
        errors[fieldName] = fieldErrors
      }
    }
  })

  return errors
}

const validateField = (value, definition) => {
  const type = definition.dataType
  const typeValidator = typeValidators[type]

  if (typeValidator) {
    return typeValidator(value)
  }
  return null
}

const fieldDefinitionCache = (() => {
  const definitionCache = {}

  const addToCache = (name, definition) => {
    definitionCache[name] = definition
  }
  const getFromCache = name => definitionCache[name]

  return {
    add: addToCache,
    get: getFromCache
  }
})()

const getFieldDefinition = (fieldName, formDefinition) => {
  if (formDefinition.id === fieldName) {
    return formDefinition.children[0]
  }

  let result = null
  if (formDefinition.children) {
    formDefinition.children.forEach(child => {
      const fieldDefinition = getFieldDefinition(fieldName, child)
      if (fieldDefinition) {
        result = fieldDefinition
      }
    })
  }

  return result
}

const stringValidator = value => {
  const minLength = 2
  if (value.length > 0 && value.length < minLength) {
    return {
      minLength: [
        <FormattedMessage key="minLength" id="client.entity-list.searchFormValidationMinLength" values={{minLength}} />
      ]
    }
  }
}

const typeValidators = {
  string: stringValidator,
  'fulltext-search': stringValidator
}
