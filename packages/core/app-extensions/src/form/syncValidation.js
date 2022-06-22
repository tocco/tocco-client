import {syncTypeValidateField, syncValidateField} from './validators/syncValidation'

export default (fieldDefinitions, formDefinition) =>
  (values = {}) =>
    fieldDefinitions.reduce((acc, fieldDefinition) => {
      const value = values[fieldDefinition.path]

      return {
        ...acc,
        ...syncValidateField(fieldDefinition, value),
        ...syncTypeValidateField(values, formDefinition, value, fieldDefinition)
      }
    }, {})
