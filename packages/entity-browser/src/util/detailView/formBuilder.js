import _startsWith from 'lodash/startsWith'
const layoutType = 'ch.tocco.nice2.model.form.components.layout.'
const actionType = 'ch.tocco.nice2.model.form.components.action.'
export const getForm = (formDefinition, createField, createLayoutComponent) => {
  return formTraverser(formDefinition.children, createField, createLayoutComponent)
}

const formTraverser = (children, createField, createLayoutComponent) => {
  const result = []

  for (let i = 0; i < children.length; i++) {
    const child = children[i]

    if (_startsWith(child.type, layoutType)) {
      const type = child.type.substr(layoutType.length, child.type.length)
      const travers = () => formTraverser(child.children, createField, createLayoutComponent)
      result.push(createLayoutComponent(child, type, i, travers))
    } else if (_startsWith(child.type, actionType)) {
      // Actions are ignored at the moment
    } else {
      result.push(createField(child, i))
    }
  }

  return result
}
