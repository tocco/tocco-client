import React from 'react'
import PropTypes from 'prop-types'

const ResizingController = ({column, startResize}) =>
  column.resizable !== false && <span onMouseDown={startResize(column)} className="resizeHandle"/>

ResizingController.propTypes = {
  column: PropTypes.shape({
    resizable: PropTypes.bool
  }).isRequired,
  startResize: PropTypes.func.isRequired
}

export default ResizingController
