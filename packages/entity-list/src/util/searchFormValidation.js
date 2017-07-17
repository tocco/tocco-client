import React from 'react'
import _forOwn from 'lodash/forOwn'
import {FormattedMessage} from 'react-intl'

import {form} from 'tocco-util'

export const validateSearchFields = (values, formDefinition) => {
  const errors = {}

  _forOwn(values, (value, fieldName) => {
    let fieldDefinition = fieldDefinitionCache.get(fieldName)
    if (!fieldDefinition) {
      fieldDefinition = getFieldDefinition(fieldName, formDefinition)
      fieldDefinitionCache.add(fieldName, fieldDefinition)
    }

    const fieldErrors = validateField(value, fieldDefinition)
    if (fieldErrors) {
      errors[fieldName] = fieldErrors
    }
  })

  return errors
}

const validateField = (value, definition) => {
  const type = definition.type
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

const getFieldDefinition = (fieldName, fieldDefinition) => {
  fieldName = form.transformFieldNameBack(fieldName)

  if (fieldDefinition.name === fieldName) {
    return fieldDefinition
  }

  let result
  fieldDefinition.children.forEach(child => {
    const fieldDefinition = getFieldDefinition(fieldName, child)
    if (fieldDefinition) result = fieldDefinition
  })
  return result
}

const typeValidators = {
  'ch.tocco.nice2.model.form.components.simple.TextField': value => {
    const minLength = 2
    if (value.length < minLength) {
      return {
        minLength: [
          <FormattedMessage
            key="minLength"
            id="client.entity-list.searchFormValidationMinLength"
            values={{minLength}}
          />
        ]
      }
    }
  }
}
