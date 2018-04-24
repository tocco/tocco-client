import componentTypes from './enums/componentTypes'
import {call} from 'redux-saga/effects'
import {requestSaga} from '../rest'

export const getFieldId = (formName, fieldName) => (
  `input-${formName}-${fieldName}`
)

export const getFieldDefinitions = formDefinition => {
  return getFieldsOfChildren(formDefinition.children)
}

const getFieldsOfChildren = children => {
  const result = []

  for (let i = 0; i < children.length; i++) {
    if (children[i].children) {
      result.push(...getFieldsOfChildren(children[i].children))
    }

    const componentType = children[i].componentType
    if (componentType === componentTypes.FIELD || componentType === componentTypes.DISPLAY) {
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

export const getFieldNames = fieldDefinitions => fieldDefinitions.map(f => f.id)

export const defaultFormTransformer = json => (json.form)

export function* fetchForm(formName, transformer = defaultFormTransformer) {
  const response = yield call(requestSaga, `forms/${formName}`)
  return yield call(transformer, response.body)
}
