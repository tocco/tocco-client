import {call} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'

const IGNORED_FIELD_TYPES = [
  'ch.tocco.nice2.model.form.components.simple.DescriptionField'
]

export const defaultFormTransformer = json => (json.form)

export function* fetchForm(formName, transformer = defaultFormTransformer) {
  const response = yield call(requestSaga, `forms/${formName}`, {
    acceptedStatusCodes: [404]
  })
  return response.body ? yield call(transformer, response.body) : null
}

const getPermissions = formDefinition => {
  const defaultPermissions = {
    create: false,
    update: false,
    delete: false,
    read: true
  }

  const permissions = formDefinition.permissions || {}

  return {...defaultPermissions, ...permissions}
}

const getSorting = table => {
  if (table.sorting) {
    return table.sorting.map(sort => `${sort.orderItem} ${sort.ascending ? 'asc' : 'desc'}`).join(',')
  }

  return null
}

export const tableDefinitionTransformer = json => {
  const {form} = json

  const isDisplayableChild = child => {
    return child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:')
      && child.displayType !== 'HIDDEN'
  }

  const tableType = 'ch.tocco.nice2.model.form.components.table.Table'

  const table = form.children.find(child => child.type === tableType)

  const columns = table.children
    .filter(column => column.displayType !== 'HIDDEN')
    .filter(column => column.children.filter(isDisplayableChild).length > 0)

  const columnDefinition = columns.map(c => (
    {
      name: c.name,
      label: c.label,
      useLabel: c.useLabel,
      sortable: c.sortable,
      child: c.children.filter(isDisplayableChild)[0]
    }
  ))

  const sorting = getSorting(table)
  const permissions = getPermissions(form)

  return {columnDefinition, sorting, permissions}
}

export const searchFormTransformer = json => json.form

export const getFieldsOfColumnDefinition = columnDefinition => (
  columnDefinition
    .filter(column => !IGNORED_FIELD_TYPES.includes(column.child))
    .map(column => column.child.name)
)
