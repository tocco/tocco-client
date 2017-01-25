const wholeEntityField = '___entity'
import {fetchRequest} from './rest'
import {SubmissionError} from 'redux-form'
import _reduce from 'lodash/reduce'
import _isEqual from 'lodash/isEqual'

export const formValuesToEntity = (values, dirtyFields) => {
  const entity = values[wholeEntityField]
  const {model, version, key} = entity

  const result = {model, version, key, paths: {}}

  const ignoreField = fieldName => (fieldName === wholeEntityField || (dirtyFields && !dirtyFields.includes(fieldName)))

  Object.keys(values).forEach(key => {
    if (!ignoreField(key)) {
      const type = entity.paths[key].type
      if (type === 'field') {
        result.paths[key] = values[key]
      } else if (type === 'entity') {
        result.paths[key] = {key: values[key]}
      } else if (type === 'entity-list') {
        result.paths[key] = {keys: values[key]}
      }
    }
  })
  return result
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

export const getDirtyFields = (initialValues, values) => {
  return _reduce(initialValues, function(result, value, key) {
    return _isEqual(value, values[key]) ? result : result.concat(key)
  }, [])
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
