import {request} from 'tocco-util/src/rest'

const IGNORED_FIELD_TYPES = [
  'ch.tocco.nice2.model.form.components.simple.DescriptionField'
]

const defaultFormTransformer = json => (json.form)

export function fetchForm(formName, transformer = defaultFormTransformer) {
  return request(`forms/${formName}`, undefined, undefined, undefined, undefined, [404])
    .then(resp => resp.body || {})
    .then(json => transformer(json))
}

export const columnDefinitionTransformer = json => {
  const {form} = json

  const tableType = 'ch.tocco.nice2.model.form.components.table.Table'
  const columns = form.children.find(child => child.type === tableType)
    .children.filter(column => column.displayType !== 'HIDDEN')

  const isDisplayableType = child => {
    return child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:')
  }

  return columns.map(c => ({
    label: c.label,
    values: c.children.filter(isDisplayableType).map(child => ({name: child.name, type: child.type}))
  }))
}

export const searchFormTransformer = json => {
  const {form} = json

  if (!form) {
    return []
  }

  const fields = form.children[0].children

  return fields
    .filter(f => f.displayType !== 'HIDDEN')
    .map(f => ({
      name: f.name,
      type: f.type,
      displayType: f.displayType,
      label: f.label,
      useLabel: f.useLabel
    }))
}

export const getFieldsOfColumnDefinition = columnDefinition => {
  let fields = []

  columnDefinition
    .filter(column => !column.values.some(field => IGNORED_FIELD_TYPES.includes(field.type)))
    .forEach(column => {
      fields = fields.concat(column.values.map(field => field.name))
    })

  return fields
}
