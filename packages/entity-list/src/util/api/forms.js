import _uniq from 'lodash/uniq'
import {actions, form, rest} from 'tocco-app-extensions'
import {call} from 'redux-saga/effects'

export const defaultFormTransformer = json => (json.form)

export function* fetchForm(formName, transformer = defaultFormTransformer) {
  const response = yield call(rest.requestSaga, `forms/${formName}`, {
    acceptedStatusCodes: [404]
  })
  return response.body ? yield call(transformer, response.body) : null
}

const getTable = formDefinition =>
  formDefinition.children.find(child => child.componentType === form.componentTypes.TABLE)

export const getSorting = formDefinition => {
  const table = getTable(formDefinition)
  return table.sorting ? table.sorting : []
}

export const getSelectable = formDefinition => {
  const table = getTable(formDefinition)
  return table.selectable !== false
}

export const getEndpoint = formDefinition => {
  const table = getTable(formDefinition)
  return table.endpoint || null
}

const isDisplayableChild = child => !child.hidden

export const getColumnDefinition = table =>
  table.children
    .filter(column => !column.hidden)
    .filter(column => column.children.filter(isDisplayableChild).length > 0)
    .map(c => (
      {
        id: c.id,
        label: c.label,
        sortable: c.sortable,
        children: c.children.filter(isDisplayableChild)
      }
    ))

export const searchFormTransformer = json => json.form

export const getFields = formDefinition => {
  const columns = getColumnDefinition(getTable(formDefinition))
  const fields = columns.reduce((accumulator, current) => (
    [
      ...accumulator,
      ...current.children
        .filter(child => !actions.isAction(child.componentType))
        .map(child => child.id)]
  ), [])

  return _uniq(fields)
}

export const getFormFieldFlat = formDefinition =>
  searchChildren(formDefinition)

const searchChildren = node => {
  if (node.componentType === 'field-set') {
    return node.children.reduce((acc, value) => ({...acc, [value.id]: value.dataType}), {})
  } else if (node.children) {
    return node.children.reduce((acc, value) => ({
      ...acc,
      ...searchChildren(value)
    }), {})
  }
}
