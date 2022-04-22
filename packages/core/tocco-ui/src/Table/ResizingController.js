import PropTypes from 'prop-types'

import {StyledResizeHandle} from './StyledComponents'

const ResizingController = ({column, startResize}) => (
  <StyledResizeHandle data-cy={`header-cell-${column.id}-resizing-controller`} onMouseDown={startResize(column)} />
)

ResizingController.propTypes = {
  column: PropTypes.shape({
    resizable: PropTypes.bool,
    id: PropTypes.string
  }).isRequired,
  startResize: PropTypes.func.isRequired
}

export default ResizingController
