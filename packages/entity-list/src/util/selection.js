import _uniq from 'lodash/uniq'

/**
 * Comparator function which can be used to sort numerical arrays in ascending order.
 */
const ascendingNumberComparator = (a, b) => a - b

/**
 * Takes the existing selection and the new selection which can be either of the type selected or deselected and
 * combines them to a new selection which will be returned.
 */
export const combineSelection = (existingSelection, selection) => {
  let newSelection = existingSelection.slice()
  for (const key of selection.keys) {
    if (selection.isSelected) {
      newSelection.push(key)
    } else {
      newSelection = newSelection.filter(k => k !== key)
    }
  }

  return _uniq(newSelection).sort(ascendingNumberComparator)
}
