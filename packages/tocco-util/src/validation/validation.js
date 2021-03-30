/**
 * extracts the first error message of a validation failed response object
 */
export const getErrorCompact = errors => {
  for (const error of errors) {
    if (error.entityValidatorErrors) {
      return getFirstElement(error.entityValidatorErrors)[0]
    }

    if (error.paths) {
      return getFirstElement(getFirstElement(error.paths))[0]
    }
  }

  return null
}

const getFirstElement = obj => Object.keys(obj).length >= 1 ? obj[Object.keys(obj)[0]] : undefined
