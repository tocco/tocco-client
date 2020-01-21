import PropTypes from 'prop-types'
import React from 'react'

import StyledButtonGroup from './StyledButtonGroup'

/**
 * Wrap <Button> into <ButtonGroup> to control flow and style.
 */
const ButtonGroup = props => (
  <StyledButtonGroup>
    {props.children}
  </StyledButtonGroup>
)

ButtonGroup.propTypes = {
  /**
   * List of true buttons morphs into a split button. Default value is 'false'.
   */
  children: PropTypes.node
}

export default ButtonGroup
