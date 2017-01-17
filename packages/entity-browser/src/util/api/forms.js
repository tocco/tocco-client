import * as rest from '../rest'

export const getFieldsOfDetailForm = formDefinition => {
  return getFieldsOfChildren(formDefinition.children)
}

const getFieldsOfChildren = children => {
  const result = []
  for (let i = 0; i < children.length; i++) {
    if (children[i].children) {
      result.push(...getFieldsOfChildren(children[i].children))
    }

    if (children[i].type.indexOf('ch.tocco.nice2.model.form.components.simple') === 0) {
      result.push(children[i].name)
    }
  }

  return result
}

const defaultFormTransformer = json => (json.form)

export function fetchForm(formName, transformer = defaultFormTransformer) {
  return rest.fetchRequest(`forms/${formName}`)
    .then(resp => resp.json())
    .then(json => transformer(json))
}

export const columnDefinitionTransformer = json => {
  const {form} = json

  const columns = form.children.find(child => child.name === 'table')
    .children.filter(column => column.displayType !== 'HIDDEN')

  return columns.map(c => ({
    label: c.label,
    value: c.children
      .filter(child =>
      child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:'))
      .map(child => child.name)
  }))
}

export const searchFormTransformer = json => {
  const {form} = json
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
