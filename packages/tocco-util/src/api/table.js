const isDisplayableChild = child => !child.hidden

const getSortingAttributes = (column, sorting) => {
  const idx = sorting && sorting.findIndex(s => s.field === column.id)
  return idx >= 0
    ? {
      sortRank: idx + 1,
      order: sorting[idx].order
    } : null
}

const rightAlignedTypes = ['counter', 'decimal', 'double', 'integer', 'latitude', 'long', 'longitude', 'moneyamount',
  'percent', 'serial', 'sorting', 'version']

const isRightAligned = column =>
  column.children && column.children.length === 1 && rightAlignedTypes.includes(column.children[0].dataType)

/**
 * Transforms nice form column definitions in a tocco-ui table compatible format.
 * @param {array} columns - columns from table form definition
 * @param {array} sorting - sorting array with field and order attributes
 * @param {function} cellRenderer - Function to return rendered cell given data and column definition
 */
export const getColumnDefinition = (columns, sorting, cellRenderer, ...args) => {
  if (!columns) {
    return []
  }
  return columns
    .filter(column => !column.hidden)
    .filter(column => column.children.filter(isDisplayableChild).length > 0)
    .map((c, idx) => (
      {
        idx: idx,
        id: c.id,
        label: c.label,
        sorting: {
          sortable: c.sortable,
          ...getSortingAttributes(c, sorting)
        },
        children: c.children.filter(isDisplayableChild),
        resizable: !c.widthFixed,
        rightAligned: isRightAligned(c),
        CellRenderer: ({rowData, column}) => column.children.map(child => cellRenderer(child, rowData, ...args))
      }
    ))
}
