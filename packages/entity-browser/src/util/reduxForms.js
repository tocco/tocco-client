const wholeEntityField = '___entity'
import {fetchRequest} from './rest'
import {SubmissionError} from 'redux-form'

export const formValuesToEntity = values => {
  const entity = values[wholeEntityField]

  Object.keys(values).forEach(key => {
    if (key !== wholeEntityField) {
      entity.paths[key].value.value = values[key]
    }
  })

  return entity
}

export const entityToFormValues = entity => {
  if (!entity || !entity.paths) return {}
  const result = {}
  const paths = entity.paths
  Object.keys(entity.paths).forEach(key => {
    if (paths[key].value != null) {
      if (paths[key].type === 'entity') {
        result[key] = paths[key].value.key
      } else if (paths[key].type === 'entity-list') {
        result[key] = paths[key].value.map(e => e.key)
      } else {
        result[key] = paths[key].value.value
      }
    }
  })

  result[wholeEntityField] = entity
  return result
}

const hasError = errors => (
  errors && Object.keys(errors).length > 0
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
