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
