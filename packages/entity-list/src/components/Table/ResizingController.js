import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const StyledResizeHandle = styled.span``

const ResizingController = ({column, startResize}) =>
  column.resizable !== false && <StyledResizeHandle onMouseDown={startResize(column)}/>

ResizingController.propTypes = {
  column: PropTypes.shape({
    resizable: PropTypes.bool
  }).isRequired,
  startResize: PropTypes.func.isRequired
}

export default ResizingController
