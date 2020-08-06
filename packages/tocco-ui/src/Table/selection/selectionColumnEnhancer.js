import React from 'react'

import selectionStyles from './selectionStyles'
import SingleSelectCell from './SingleSelectCell'
import MultiSelectCell from './MultiSelectCell'
import MultiSelectHeader from './MultiSelectHeader'

export const getSelectionCell = (selectionStyle, columns, isSelected, selectionChange) => {
  if (selectionStyle && selectionStyle !== selectionStyles.NONE) {
    return selectionStyle === selectionStyles.MULTI
      ? getMultiSelectionCell(isSelected, selectionChange)
      : getSingleSelectionCell(isSelected, selectionChange)
  }
  return null
}

const getSingleSelectionCell = (isSelected, selectionChange) => ({
  id: 'single-selection',
  width: 30,
  resizable: false,
  fixedPosition: true,
  dynamic: true,
  sorting: {
    sortable: false
  },
  HeaderRenderer: () => null,
  CellRenderer: props => <SingleSelectCell {...props} isSelected={isSelected} selectionChange={selectionChange}/>
})

const getMultiSelectionCell = (isSelected, selectionChange) => ({
  id: 'multi-selection',
  dynamic: true,
  resizable: false,
  fixedPosition: true,
  width: 30,
  sorting: {
    sortable: false
  },
  HeaderRenderer: props => <MultiSelectHeader {...props} isSelected={isSelected} selectionChange={selectionChange}/>,
  CellRenderer: props => <MultiSelectCell {...props} isSelected={isSelected} selectionChange={selectionChange}/>
})
