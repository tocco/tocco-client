import _uniq from 'lodash/uniq'
import {actions, form} from 'tocco-app-extensions'

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

/**
 * If the search form contains a field pointing to the parent entity this must not be a full-text
 * search field and should be readonly. This function will search for the correct field and replace its
 * type and change the readonly attribute.
 */
export const changeParentFieldType = (formElement, parentPath) => {
  if (formElement.componentType === 'field-set') {
    const containsParentField = formElement.children.some(child => child.path === parentPath)

    return {
      ...formElement,
      ...(containsParentField && {readonly: true}),
      children: formElement.children.map(child =>
        child.path === parentPath
          ? {...child, dataType: 'single-select-box'}
          : child)
    }
  }
  if (formElement.children) {
    return {
      ...formElement,
      children: formElement.children.map(child => changeParentFieldType(child, parentPath))
    }
  }

  return formElement
}
