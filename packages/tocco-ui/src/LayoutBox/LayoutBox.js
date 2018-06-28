import PropTypes from 'prop-types'
import React from 'react'

import StyledLayoutBox from './StyledLayoutBox'

/**
 * Wrap as many <LayoutBox/> into a <LayoutContainer> to Layout them.
 */
const LayoutBox = props => {
  return (
    <StyledLayoutBox
      containerWidth={props.containerWidth}
      isNestedCorrectly={props.parent === 'LayoutContainer'}
      maxCellsPerRow={props.maxCellsPerRow}
    >
      {
        React.Children.map(props.children, child =>
          React.cloneElement(child, {
            parent: 'LayoutBox'
          })
        )
      }
    </StyledLayoutBox>
  )
}

LayoutBox.defaultProps = {
  maxCellsPerRow: {
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
  }
}

LayoutBox.propTypes = {
  children: PropTypes.node,
  /* Width of container in device independent pixel of parent element is always overridden by parent element. */
  containerWidth: PropTypes.number,
  /* Define how many cells are displayed per row at most. Value is always overridden by parent element. */
  maxCellsPerRow: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  /* Internal mechanism to determine if nesting is correct. Do never set manually. */
  parent: PropTypes.string
}

export default LayoutBox
