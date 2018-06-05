import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelBody from './StyledPanelBody'

/**
 * Only <PanelBody/> is affected by the visibility state.
 */
class PanelBody extends React.Component {
  render() {
    const {
      // eslint-disable-next-line
      children,
      isOpen
    } = this.props

    return (
      <StyledPanelBody
        isOpen={isOpen}>
        {React.Children.map(children, child => React.cloneElement(child))}
      </StyledPanelBody>
    )
  }
}

PanelBody.propTypes = {
  /**
   * Boolean to control if <PanelBody/> is initially opened. Value is always overridden by parent element.
   */
  isOpen: PropTypes.bool
}

export default PanelBody
