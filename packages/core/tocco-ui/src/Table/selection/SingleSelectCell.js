import PropTypes from 'prop-types'
import React from 'react'

const SingleSelectCell = ({rowData, isSelected, selectionChange}) => (
  <div onClick={e => e.stopPropagation()}>
    <input
      type="radio"
      checked={isSelected(rowData.__key)}
      onChange={e => {
        selectionChange(rowData.__key, e.target.value)
      }}
    />
  </div>
)

SingleSelectCell.propTypes = {
  isSelected: PropTypes.func.isRequired,
  rowData: PropTypes.shape({
    __key: PropTypes.string.isRequired
  }).isRequired,
  selectionChange: PropTypes.func.isRequired
}

export default SingleSelectCell
