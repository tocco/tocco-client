import {request} from 'tocco-util/src/rest'

export const getFieldsOfDetailForm = formDefinition => {
  return getFieldsOfChildren(formDefinition.children)
}

const getFieldsOfChildren = children => {
  const result = []
  for (let i = 0; i < children.length; i++) {
    if (children[i].children) {
      if (children[i].type !== 'ch.tocco.nice2.model.form.components.navigation.IteratorComponent') {
        result.push(...getFieldsOfChildren(children[i].children))
      }
    }

    const ignoredTypes = [
      'ch.tocco.nice2.model.form.components.simple.DescriptionField'
    ]

    const fieldType = children[i].type
    if (fieldType.indexOf('ch.tocco.nice2.model.form.components.simple') === 0 && !ignoredTypes.includes(fieldType)) {
      result.push(children[i].name)
    }
  }

  return result
}

const defaultFormTransformer = json => (json.form)

export function fetchForm(formName, transformer = defaultFormTransformer) {
  return request(`forms/${formName}`)
    .then(resp => resp.body)
    .then(json => transformer(json))
}

export const columnDefinitionTransformer = json => {
  const {form} = json

  const columns = form.children.find(child => child.name === 'table')
    .children.filter(column => column.displayType !== 'HIDDEN')

  const isDisplayableType = child => {
    return child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:')
  }

  return columns.map(c => ({
    label: c.label,
    value: c.children.filter(isDisplayableType).map(child => child.name)
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

export const getFieldsOfColumnDefinition = columnDefinition => {
  let fields = []

  columnDefinition.forEach(column => {
    fields = fields.concat(column.value)
  })

  return fields
}
