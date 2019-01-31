import _uniq from 'lodash/uniq'

import selectionStyles from './selectionStyles'

export const showSelectionComponent = (inputSelectionStyle, disableSelectionController, formSelectable) => {
  return disableSelectionController !== true
    && (!inputSelectionStyle || inputSelectionStyle === selectionStyles.MULTI)
    && formSelectable !== false
}

export const getTableSelectionStyle = (inputSelectionStyle, fromSelectable) => {
  if (fromSelectable === false || inputSelectionStyle === selectionStyles.NONE) {
    return selectionStyles.NONE
  }

  if (inputSelectionStyle === selectionStyles.SINGLE) {
    return selectionStyles.SINGLE
  }

  return selectionStyles.MULTI
}

/**
 * Comparator function which can be used to sort numerical arrays in ascending order.
 */
const ascendingNumberComparator = (a, b) => a - b

/**
 * Takes the existing selection and the new selection which can be either of the type selected or deselected and
 * combines them to a new selection which will be returned.
 */
export const combineSelection = (currentSelection, keys, isSelected) => {
  let newSelection = currentSelection.slice()
  for (const key of keys) {
    if (isSelected) {
      newSelection.push(key)
    } else {
      newSelection = newSelection.filter(k => k !== key)
    }
  }

  return _uniq(newSelection).sort(ascendingNumberComparator)
}
