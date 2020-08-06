import React from 'react'
import PropTypes from 'prop-types'

import {MultiCheckbox} from '../../'
import {dataPropType} from '../propTypes'

const MultiSelectHeader = ({data, isSelected, selectionChange}) => {
  const allKeys = data.map(e => e.__key)
  const allRowsSelectionChange = v => {
    selectionChange(allKeys, v === 'checked')
  }

  const allRowsSelectionState = allKeys.every(k => isSelected(k))
    ? 'checked' : allKeys.some(k => isSelected(k))
      ? 'indeterminate'
      : 'unchecked'
  return data.length === 0
    ? null
    : <MultiCheckbox value={allRowsSelectionState} onChange={allRowsSelectionChange}/>
}

MultiSelectHeader.propTypes = {
  isSelected: PropTypes.func.isRequired,
  data: dataPropType.isRequired,
  selectionChange: PropTypes.func.isRequired
}

export default MultiSelectHeader
