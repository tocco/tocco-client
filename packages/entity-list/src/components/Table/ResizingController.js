import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _get from 'lodash/get'
import {shadeColor} from 'tocco-ui'

export const StyledResizeHandle = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
  opacity: 0;
  width: 3px;
  cursor: col-resize;
`

const ResizingController = ({column, startResize}) =>
  column.resizable !== false && <StyledResizeHandle onMouseDown={startResize(column)}/>

ResizingController.propTypes = {
  column: PropTypes.shape({
    resizable: PropTypes.bool
  }).isRequired,
  startResize: PropTypes.func.isRequired
}

export default ResizingController
