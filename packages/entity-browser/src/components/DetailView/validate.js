import {formValuesToEntity} from '../../util/forms'
import {fetchRequest} from '../../util/rest'
import {SubmissionError} from 'redux-form'

const hasError = errors => (
  Object.keys(errors).length > 0
)

const validateRequest = values => {
  const entity = formValuesToEntity(values)
  return fetchRequest(`entities/${entity.model}/${entity.key}/validate`, {}, 'POST', entity)
    .then(resp => resp.json())
    .then(json => json.fields)
}

export const submitValidate = values => {
  return validateRequest(values)
    .then(errors => {
      if (hasError(errors)) {
        throw new SubmissionError(errors)
      }
    })
}

export const asyncValidate = values => {
  return validateRequest(values)
    .then(errors => {
      if (hasError(errors)) {
        throw errors
      }
    })
}
