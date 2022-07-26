import _uniq from 'lodash/uniq'
import {actions, form} from 'tocco-app-extensions'
import {api} from 'tocco-util'

import cellRenderer from '../cellRenderer'
import {StyledColumnContentWrapper} from '../StyledComponents'

export const getFormDefinition = (state, query) =>
  (query || state.selection.query).hasUserChanges && state.list.searchListFormDefinition
    ? state.list.searchListFormDefinition
    : state.list.formDefinition

export const getTable = formDefinition =>
  formDefinition.children.find(child => child.componentType === form.componentTypes.TABLE)

export const getActionBar = formDefinition =>
  formDefinition.children.find(child => child.componentType === form.componentTypes.ACTION_BAR)

export const getSorting = formDefinition => {
  const table = getTable(formDefinition)
  return table.sorting ? table.sorting : []
}

export const getSelectable = formDefinition => {
  if (!formDefinition) {
    return false
  }
  const table = getTable(formDefinition)
  return table.selectable !== false
}

export const getClickable = formDefinition => {
  const table = getTable(formDefinition)
  return table.clickable !== false
}

export const getDisablePreferencesMenu = formDefinition => formDefinition.disablePreferencesMenu === true

export const getEndpoint = formDefinition => {
  const table = getTable(formDefinition)
  return table?.endpoint || null
}

export const getSearchEndpoint = formDefinition => {
  const table = getTable(formDefinition)
  return table?.searchEndpoint || null
}

export const getConstriction = formDefinition => {
  const table = getTable(formDefinition)
  return table?.constriction || null
}

const isDisplayableChild = child => !child.hidden

const getSortingAttributes = (column, sorting) => {
  const idx = sorting && sorting.findIndex(s => s.field === column.id)
  return idx >= 0
    ? {
        sortRank: idx + 1,
        order: sorting[idx].order
      }
    : null
}

const rightAlignedTypes = [
  'counter',
  'decimal',
  'double',
  'integer',
  'latitude',
  'long',
  'longitude',
  'moneyamount',
  'percent',
  'serial',
  'sorting',
  'version'
]

const isRightAligned = column =>
  column.children && column.children.length === 1 && rightAlignedTypes.includes(column.children[0].dataType)

const wrapColumnContent = content =>
  content.length > 1 ? <StyledColumnContentWrapper>{content}</StyledColumnContentWrapper> : content

const defaultCellRenderer = (rowData, parent, intl) => child => cellRenderer(child, rowData, parent, intl)

const clientRenderer =
  (renderer, parent, intl) =>
  ({rowData, column}) =>
    renderer(rowData, column, defaultCellRenderer(rowData, parent, intl))

const fallbackRenderer =
  (parent, intl) =>
  ({rowData, column}) => {
    const dataAvailable = column.children.some(
      child => !child.onlyShowOnEmptyColumn && child.path && rowData[child.path]
    )
    const content = column.children
      .filter(child => dataAvailable === !child.onlyShowOnEmptyColumn)
      .map(defaultCellRenderer(rowData, parent, intl))
    return wrapColumnContent(content)
  }

export const getColumnCellRenderer = ({cellRenderers, columnDefinition, parent, intl}) => {
  const hasValidClientRenderer = columnDefinition.clientRenderer && cellRenderers[columnDefinition.clientRenderer]
  if (hasValidClientRenderer) {
    return clientRenderer(cellRenderers[columnDefinition.clientRenderer], parent, intl)
  }

  const hasFallbackChildren = columnDefinition.children.some(child => child.onlyShowOnEmptyColumn)
  if (hasFallbackChildren) {
    return fallbackRenderer(parent, intl)
  }

  return ({rowData, column}) => {
    return wrapColumnContent(column.children.map(defaultCellRenderer(rowData, parent, intl)))
  }
}

export const getColumnDefinition = ({
  table,
  sorting,
  sortable = true,
  parent,
  intl,
  columnDisplayPreferences = {},
  cellRenderers = {}
}) =>
  table.children
    .filter(column =>
      Object.prototype.hasOwnProperty.call(columnDisplayPreferences, column.id)
        ? columnDisplayPreferences[column.id]
        : !column.hidden
    )
    .filter(column => !parent || column.children.length !== 1 || column.children[0].path !== parent.reverseRelationName)
    .filter(column => column.children.filter(isDisplayableChild).length > 0)
    .map(c => ({
      id: c.id,
      label: c.label,
      sorting: {
        sortable: sortable && c.sortable,
        ...getSortingAttributes(c, sorting)
      },
      shrinkToContent: c.shrinkToContent || false,
      children: c.children.filter(isDisplayableChild),
      resizable: !c.widthFixed,
      rightAligned: isRightAligned(c),
      CellRenderer: getColumnCellRenderer({cellRenderers, columnDefinition: c, parent, intl})
    }))

export const getFields = (formDefinition, columnDisplayPreferences) => {
  const relationFields = []
  const displayExpressionFields = []
  const columns = getColumnDefinition({table: getTable(formDefinition), columnDisplayPreferences})

  const fields = columns.reduce(
    (accumulator, current) => [
      ...accumulator,
      ...current.children
        .filter(child => !actions.isAction(child.componentType))
        .map(child => {
          if (api.relationFieldTypes.includes(child.dataType)) {
            relationFields.push(child.path)
          } else if (child.componentType === 'display') {
            displayExpressionFields.push(child.id)
            return null
          }

          return child.path
        })
        .filter(f => f)
    ],
    []
  )

  return {paths: _uniq(fields), relationFields, displayExpressionFields}
}

export const getFormFieldFlat = formDefinition => searchChildren(formDefinition)

const searchChildren = node => {
  if (node.componentType === 'field-set') {
    return node.children.reduce((acc, value) => ({...acc, [value.path || value.id]: value.dataType}), {})
  } else if (node.children) {
    return node.children.reduce(
      (acc, value) => ({
        ...acc,
        ...searchChildren(value)
      }),
      {}
    )
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
        child.path === parentPath ? {...child, dataType: 'single-select-box'} : child
      )
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

export const getTableColumns = (formDefinition, parent, columnDisplayPreferences = {}) =>
  getTable(formDefinition)
    .children.filter(
      column => !parent || column.children.length !== 1 || column.children[0].path !== parent.reverseRelationName
    )
    .map(column => ({
      ...column,
      hidden: Object.prototype.hasOwnProperty.call(columnDisplayPreferences, column.id)
        ? !columnDisplayPreferences[column.id]
        : column.hidden
    }))

export const splitFormId = formId => {
  const index = formId.lastIndexOf('_')
  const formName = formId.substring(0, index)
  const scope = formId.substring(index + 1)
  return {
    formName,
    scope
  }
}
