import PropTypes from 'prop-types'

import {MultiCheckbox} from '../../'
import {rowDataPropType} from '../propTypes'

const MultiSelectCell = ({rowData, isSelected, selectionChange, selectionFilterFn, rowIdx}) => {
  const rowSelectionState = data => (isSelected(data.__key) ? 'checked' : 'unchecked')
  const rowSelectionChange = data => value => selectionChange(data.__key, value === 'checked')

  const isRowSelectable = typeof selectionFilterFn === 'function' ? selectionFilterFn(rowData) : true
  if (!isRowSelectable) {
    return null
  }

  return (
    <div
      onClick={e => {
        if (e.shiftKey) {
          selectionChange(rowData.__key, true, true)
        }
        e.stopPropagation()
      }}
      data-cy="list-selection-checkbox"
    >
      <MultiCheckbox
        value={rowSelectionState(rowData)}
        onChange={rowSelectionChange(rowData)}
        label={`${rowData.__model} ${rowIdx + 1}`}
        id={'list-selection-checkbox ' + rowData.__key}
      />
    </div>
  )
}

MultiSelectCell.propTypes = {
  isSelected: PropTypes.func.isRequired,
  rowData: rowDataPropType.isRequired,
  rowIdx: PropTypes.number,
  selectionChange: PropTypes.func.isRequired,
  selectionFilterFn: PropTypes.func
}

export default MultiSelectCell
