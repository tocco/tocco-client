import MultiSelectCell from './MultiSelectCell'
import MultiSelectHeader from './MultiSelectHeader'
import selectionStyles from './selectionStyles'
import SingleSelectCell from './SingleSelectCell'

export const getSelectionCell = (selectionStyle, columns, isSelected, selectionChange, selectionFilterFn) => {
  if (selectionStyle && selectionStyle !== selectionStyles.NONE) {
    return selectionStyle === selectionStyles.MULTI
      ? getMultiSelectionCell(isSelected, selectionChange, selectionFilterFn)
      : getSingleSelectionCell(isSelected, selectionChange, selectionFilterFn)
  }
  return null
}

const getSingleSelectionCell = (isSelected, selectionChange, selectionFilterFn) => ({
  id: 'single-selection',
  width: 30,
  resizable: false,
  fixedPosition: true,
  dynamic: true,
  sorting: {
    sortable: false
  },
  HeaderRenderer: () => null,
  CellRenderer: props => (
    <SingleSelectCell
      {...props}
      isSelected={isSelected}
      selectionChange={selectionChange}
      selectionFilterFn={selectionFilterFn}
    />
  )
})

const getMultiSelectionCell = (isSelected, selectionChange, selectionFilterFn) => ({
  id: 'multi-selection',
  dynamic: true,
  resizable: false,
  fixedPosition: true,
  width: 30,
  sorting: {
    sortable: false
  },
  HeaderRenderer: props => (
    <MultiSelectHeader
      {...props}
      isSelected={isSelected}
      selectionChange={selectionChange}
      selectionFilterFn={selectionFilterFn}
    />
  ),
  CellRenderer: props => (
    <MultiSelectCell
      {...props}
      isSelected={isSelected}
      selectionChange={selectionChange}
      selectionFilterFn={selectionFilterFn}
    />
  )
})
