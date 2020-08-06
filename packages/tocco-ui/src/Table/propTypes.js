import PropTypes from 'prop-types'

export const keyPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export const rowDataPropType = PropTypes.shape({
  __key: keyPropType
})

export const dataPropType = PropTypes.arrayOf(rowDataPropType)

export const columnPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  sorting: PropTypes.shape({
    sortable: PropTypes.bool,
    sortRank: PropTypes.number,
    order: PropTypes.oneOf(['asc', 'desc'])
  }),
  resizable: PropTypes.bool,
  width: PropTypes.number,
  HeaderRenderer: PropTypes.elementType,
  CellRenderer: PropTypes.elementType,
  rightAligned: PropTypes.bool
})
