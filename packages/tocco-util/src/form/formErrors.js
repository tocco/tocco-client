import _omit from 'lodash/omit'
import _forOwn from 'lodash/forOwn'
import _reduce from 'lodash/reduce'

export const generalErrorField = '_error'
export const entityValidatorErrorsField = 'entityValidatorErrors'
export const relatedEntityErrorsField = 'relatedEntityErrors'

const getFieldErrors = formErrors => (
  _omit(formErrors, generalErrorField)
)

const hasFieldErrors = formErrors => (
  Object.keys(getFieldErrors(formErrors)).length >= 1
)

const hasValidatorErrors = formErrors => {
  const errors = getGeneralErros(formErrors)
  return !!(errors && errors[entityValidatorErrorsField] && Object.keys(errors[entityValidatorErrorsField]).length >= 1)
}

const getValidatorErrors = formErrors => {
  const errors = getGeneralErros(formErrors)
  return _reduce(errors[entityValidatorErrorsField], (result, value) => [...result, ...value], [])
}

const hasRelatedEntityErrors = formErrors => {
  const errors = getGeneralErros(formErrors)
  return !!(errors && errors[relatedEntityErrorsField] && errors[relatedEntityErrorsField].length >= 1)
}

const getGeneralErros = formErrors => (
  formErrors[generalErrorField]
)

const getFirstErrorField = formErrors => (
  Object.keys(getFieldErrors(formErrors))[0]
)

const getRelatedEntityErrorsCompact = formErrors => {
  const relatedEntityErrors = getGeneralErros(formErrors).relatedEntityErrors

  return _reduce(relatedEntityErrors, (result, relatedEntityError) => {
    const {key, model, paths, entityValidatorErrors} = relatedEntityError

    const r = [...result]
    _forOwn(paths, (values, fieldName) => {
      _forOwn(values, (errors, errorKey) => {
        r.push(...(errors.map(e => `${e} (${fieldName}, ${model}, ${key})`)))
      })
    })

    if (entityValidatorErrors && Object.keys(entityValidatorErrors).length >= 1) {
      r.push(...(
        _reduce(
          entityValidatorErrors,
          (result, value) => [...result, ...(value.map(e => `${e} (${model}, ${key})`))],
          []))
      )
    }

    return r
  }, [])
}

export default {
  hasFieldErrors,
  getFieldErrors,
  getValidatorErrors,
  hasValidatorErrors,
  hasRelatedEntityErrors,
  getFirstErrorField,
  getRelatedEntityErrorsCompact
}
