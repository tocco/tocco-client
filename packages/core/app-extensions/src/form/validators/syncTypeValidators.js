import {transformFieldName} from '../reduxForm'
import {getFormFieldDefinition, hasError} from '../utils'
import {syncValidateField} from './syncValidation'

const getField = (id, formDefinition) => {
  if (formDefinition.id === id) {
    return getFormFieldDefinition(formDefinition)
  }

  if (!formDefinition.children || formDefinition.children.length === 0) {
    return null
  }

  return formDefinition.children.reduce((acc, child) => acc || getField(id, child), null)
}

export const locationValidator = (_value, fieldDefinition, formDefinition, values) => {
  const locationMapping = fieldDefinition.locationMapping

  const cityField = getField(locationMapping.city, formDefinition)
  const postcodeField = getField(locationMapping.postcode, formDefinition)

  const cityErrors = syncValidateField(cityField, values[transformFieldName(cityField.path)], {})
  const postcodeErrors = syncValidateField(postcodeField, values[transformFieldName(postcodeField.path)], {})

  return hasError(cityErrors) || hasError(postcodeErrors)
    ? {
        [fieldDefinition.id]: {
          ...cityErrors[cityField.path],
          ...postcodeErrors[postcodeField.path]
        }
      }
    : {}
}

export default {
  location: locationValidator
}
