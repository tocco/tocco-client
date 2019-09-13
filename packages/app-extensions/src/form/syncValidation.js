import _forOwn from 'lodash/forOwn'
import _get from 'lodash/get'

import validators from './validators'
import formErrors from './formErrors'

export default entityModel =>
  values => (
    validate(
      values,
      entityModel
    )
  )

const validate = (values, entityModel) => {
  let errors = {}

  errors = validateModel(values, entityModel, errors)
  errors = validateTypes(values, entityModel, errors)
  return errors
}

const validateTypes = (values, entityModel, errors) => {
  _forOwn(values, (value, key) => {
    if (value) {
      const type = _get(entityModel, `paths.${key}.type`)
      const typeValidator = validators.syncValidators[type]
      if (typeValidator) {
        const fieldModel = entityModel[key]
        const validatorError = typeValidator(value, fieldModel)
        if (validatorError) {
          errors = formErrors.addErrors(errors, key, validatorError)
        }
      }
    }
  })

  return errors
}

const validateModel = (values, entityModel, errors) => {
  const getValidatorValue = (fieldModel, selector) => {
    if (fieldModel.validation) {
      return fieldModel.validation[selector]
    }
  }

  const getValueSelector = fieldModel => fieldModel.type === 'relation' ? fieldModel.relationName : fieldModel.fieldName

  _forOwn(entityModel.paths, fieldModel => {
    const valueSelector = getValueSelector(fieldModel)
    const fieldValue = values[valueSelector]

    _forOwn(validators.modelValidators, (validator, name) => {
      const validatorValue = getValidatorValue(fieldModel, name)
      if (validatorValue) {
        const validatorErrors = validator(fieldValue, validatorValue)
        if (validatorErrors) {
          errors = formErrors.addErrors(errors, valueSelector, validatorErrors)
        }
      }
    })
  })

  return errors
}
