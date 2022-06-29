import PropTypes from 'prop-types'

import {MultiCheckbox} from '../../'
import {dataPropType} from '../propTypes'

const getRowSelectionState = (allKeysSelected, someKeysSelected) => {
  if (allKeysSelected) {
    return 'checked'
  }

  return someKeysSelected ? 'indeterminate' : 'unchecked'
}

const MultiSelectHeader = ({data, isSelected, selectionChange}) => {
  const allKeys = data.map(e => e.__key)
  const allRowsSelectionChange = v => {
    selectionChange(allKeys, v === 'checked')
  }

  const allKeysSelected = allKeys.every(k => isSelected(k))
  const someKeysSelected = allKeys.some(k => isSelected(k))
  const allRowsSelectionState = getRowSelectionState(allKeysSelected, someKeysSelected)
  return data.length === 0 ? null : <MultiCheckbox value={allRowsSelectionState} onChange={allRowsSelectionChange} />
}

MultiSelectHeader.propTypes = {
  isSelected: PropTypes.func.isRequired,
  data: dataPropType.isRequired,
  selectionChange: PropTypes.func.isRequired
}

export default MultiSelectHeader
