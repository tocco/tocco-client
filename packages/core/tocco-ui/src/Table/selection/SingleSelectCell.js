import PropTypes from 'prop-types'

const SingleSelectCell = ({rowData, isSelected, selectionChange, selectionFilterFn}) => {
  const isRowSelectable = typeof selectionFilterFn === 'function' ? selectionFilterFn(rowData) : true
  if (!isRowSelectable) {
    return null
  }

  return (
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
}

SingleSelectCell.propTypes = {
  isSelected: PropTypes.func.isRequired,
  rowData: PropTypes.shape({
    __key: PropTypes.string.isRequired
  }).isRequired,
  selectionChange: PropTypes.func.isRequired,
  selectionFilterFn: PropTypes.func
}

export default SingleSelectCell
