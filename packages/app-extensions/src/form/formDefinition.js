import _uniq from 'lodash/uniq'
import {call} from 'redux-saga/effects'

import componentTypes from './enums/componentTypes'
import rest from '../rest'

export const getFieldId = (formName, fieldName) => (
  `input-${formName}-${fieldName}`
)

export const getFieldDefinitions = formDefinition => {
  return getFieldsOfChildren(formDefinition.children)
}

const validFieldTypes = [
  componentTypes.FIELD,
  componentTypes.DISPLAY,
  componentTypes.SEARCH_FILTER,
  componentTypes.FULLTEXT_SEARCH
]

const getFieldsOfChildren = children => {
  const result = []

  for (let i = 0; i < children.length; i++) {
    if (children[i].children) {
      result.push(...getFieldsOfChildren(children[i].children))
    }

    const componentType = children[i].componentType

    if (validFieldTypes.includes(componentType)) {
      result.push(children[i])
    }
  }

  return result
}

export const getDefaultValues = fieldDefinitions =>
  fieldDefinitions
    .filter(f => f.defaultValue)
    .reduce((valueObj, field) => ({
      ...valueObj,
      [field.id]: field.defaultValue
    }), {})

const typePathsHandlers = {
  location: fieldDefinition => Object.values(fieldDefinition.locationMapping)
}

export const getUsedPaths = fieldDefinitions => _uniq(fieldDefinitions.reduce((accumulator, field) =>
  [
    ...accumulator,
    ...(typePathsHandlers[field.dataType] ? typePathsHandlers[field.dataType](field) : [field.path || field.id])
  ],
[]))

export const defaultFormTransformer = json => (json.form)

export function* fetchForm(formName, transformer = defaultFormTransformer) {
  const response = yield call(rest.requestSaga, `forms/${formName}`)
  return yield call(transformer, response.body)
}
