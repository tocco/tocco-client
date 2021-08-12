import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelBody from './StyledPanelBody'

/**
 * Only <Panel.Body/> is affected by the visibility state.
 */

const PanelBody = ({children, isFramed, isOpen}) =>
    <StyledPanelBody
      isFramed={isFramed}
      isOpen={isOpen}
    >
      <div>
        {children}
      </div>
    </StyledPanelBody>

PanelBody.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <Panel.Header/>, <Panel.Body/> and <Panel.Footer/> is initially opened.
   * Value is always overridden by parent element.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <Panel.Body/> is initially opened. Value is always overridden by parent element.
   */
  isOpen: PropTypes.bool
}

export default PanelBody
