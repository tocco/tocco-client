import PropTypes from 'prop-types'
import React from 'react'

import StyledLayoutBox from './StyledLayoutBox'
import {layoutPropTypes, stylingLayout} from '../utilStyles'

/**
 * Wrap as many <Layout.Box/> into a <Layout.Container> to layout them.
 */
const LayoutBox = props =>
  <StyledLayoutBox
    containerWidth={props.containerWidth}
    isNestedCorrectly={props.parent === stylingLayout.CONTAINER}
    maxCellsPerRow={props.maxCellsPerRow}
  >
    {
      React.Children.map(props.children, child =>
        React.cloneElement(child, {
          parent: stylingLayout.BOX
        })
      )
    }
  </StyledLayoutBox>

LayoutBox.defaultProps = {
  maxCellsPerRow: {
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
  },
  parent: stylingLayout.NONE
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
  parent: layoutPropTypes
}

export default LayoutBox
