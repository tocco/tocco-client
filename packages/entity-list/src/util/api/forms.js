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

  const isDisplayableChild = child => {
    return child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:')
      && child.displayType !== 'HIDDEN'
  }

  return columns.map(c => (
    {
      name: c.name,
      label: c.label,
      useLabel: c.useLabel,
      child: c.children.filter(isDisplayableChild)[0]
    }
  ))
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

export const getFieldsOfColumnDefinition = columnDefinition => (
  columnDefinition
    .filter(column => !IGNORED_FIELD_TYPES.includes(column.child))
    .map(column => column.child.name)
)
