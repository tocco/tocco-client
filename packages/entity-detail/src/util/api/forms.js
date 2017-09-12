import {call} from 'redux-saga/effects'
import _startsWith from 'lodash/startsWith'
import {requestSaga} from 'tocco-util/src/rest'

const IGNORED_FIELD_TYPES = [
  'ch.tocco.nice2.model.form.components.simple.DescriptionField'
]

export const getFieldsOfDetailForm = formDefinition => {
  return getFieldsOfChildren(formDefinition.children)
}

const getFieldsOfChildren = children => {
  const result = []

  const subIterationTypes = [
    'ch.tocco.nice2.model.form.components.navigation.IteratorComponent',
    'ch.tocco.nice2.model.form.components.table.Table'
  ]

  for (let i = 0; i < children.length; i++) {
    if (children[i].children) {
      const childType = children[i].type
      if (!subIterationTypes.includes(childType)) {
        result.push(...getFieldsOfChildren(children[i].children))
      }
    }

    const fieldType = children[i].type
    if (_startsWith(fieldType, 'ch.tocco.nice2.model.form.components.simple')
      && !IGNORED_FIELD_TYPES.includes(fieldType)) {
      result.push(children[i])
    }
  }

  return result
}

export const defaultFormTransformer = json => (json.form)

export function* fetchForm(formName, transformer = defaultFormTransformer) {
  const response = yield call(requestSaga, `forms/${formName}`)
  return yield call(transformer, response.body)
}
