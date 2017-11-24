import {call} from 'redux-saga/effects'
import _uniq from 'lodash/uniq'
import {requestSaga} from 'tocco-util/src/rest'
import {actions} from 'tocco-util'

const IGNORED_FIELD_TYPES = [
  'ch.tocco.nice2.model.form.components.simple.DescriptionField'
]

const TABLE_TYPE = 'ch.tocco.nice2.model.form.components.table.Table'

export const defaultFormTransformer = json => (json.form)

export function* fetchForm(formName, transformer = defaultFormTransformer) {
  const response = yield call(requestSaga, `forms/${formName}`, {
    acceptedStatusCodes: [404]
  })
  return response.body ? yield call(transformer, response.body) : null
}

const getTable = formDefinition =>
  formDefinition.children.find(child => child.type === TABLE_TYPE)

export const getSorting = formDefinition => {
  const table = getTable(formDefinition)
  return table.sorting ? table.sorting : []
}

export const getColumnDefinition = table => {
  const isDisplayableChild = child => {
    return child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:')
      && child.displayType !== 'HIDDEN'
  }

  return table.children
    .filter(column => column.displayType !== 'HIDDEN')
    .filter(column => column.children.filter(isDisplayableChild).length > 0)
    .map(c => (
      {
        name: c.name,
        label: c.label,
        useLabel: c.useLabel,
        sortable: c.sortable,
        children: c.children.filter(isDisplayableChild)
      }
    ))
}

export const searchFormTransformer = json => json.form

export const getFields = formDefinition => {
  const columns = getColumnDefinition(getTable(formDefinition))

  const fields = columns.reduce((accumulator, current) => (
    [
      ...accumulator,
      ...current.children
        .filter(child => !IGNORED_FIELD_TYPES.includes(child.type))
        .filter(child => !actions.isAction(child.type))
        .map(child => child.name)]
  ), [])

  return _uniq(fields)
}
