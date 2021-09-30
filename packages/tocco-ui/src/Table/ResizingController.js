import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _get from 'lodash/get'

import {shadeColor} from '../'

export const StyledResizeHandle = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 3)};
  opacity: 0;
  width: 3px;
  cursor: col-resize;
`

const ResizingController = ({
  column,
  startResize
}) => <StyledResizeHandle
  data-cy={`header-cell-${column.id}-resizing-controller`}
  onMouseDown={startResize(column)}
/>

ResizingController.propTypes = {
  column: PropTypes.shape({
    resizable: PropTypes.bool,
    id: PropTypes.string
  }).isRequired,
  startResize: PropTypes.func.isRequired
}

export default ResizingController
