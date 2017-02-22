import _omit from 'lodash/omit'
import _forOwn from 'lodash/forOwn'

export const generalErrorField = '_error'

const getFieldErrors = formErrors => (
  _omit(formErrors, generalErrorField)
)

const hasFieldErrors = formErrors => (
  Object.keys(getFieldErrors(formErrors)).length >= 1
)

const getGeneralErros = formErrors => (
  formErrors[generalErrorField]
)

const hasPathErrors = formErrors => {
  const errors = getGeneralErros(formErrors)
  return errors && errors.pathErrors && errors.pathErrors.length >= 1
}

const getFirstErrorField = formErrors => (
  Object.keys(getFieldErrors(formErrors))[0]
)

const getPathErrorsCompact = formErrors => {
  const pathErrors = getGeneralErros(formErrors).pathErrors
  return pathErrors.map(pathError => {
    let message = ''
    const {key, model} = pathError
    message += `${model}  ${key}: `
    _forOwn(pathError.paths, (values, fieldName) => {
      _forOwn(values, (errors, errorKey) => {
        message += errors.join(' ')
      })
      message += ` (${fieldName})`
    })
    return message
  })
}

export default {
  hasFieldErrors,
  getFieldErrors,
  hasPathErrors,
  getGeneralErros,
  getFirstErrorField,
  getPathErrorsCompact
}
