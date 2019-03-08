import PropTypes from 'prop-types'
import React from 'react'

import StyledLayoutBox from './StyledLayoutBox'
import {design} from '../utilStyles'

/**
 * Wrap as many <Layout.Box/> into a <Layout.Container> to layout them.
 */
class LayoutBox extends React.PureComponent {
  render() {
    return <StyledLayoutBox
      containerWidth={this.props.containerWidth}
      isNestedCorrectly={this.props.parent === design.layout.CONTAINER}
      maxCellsPerRow={this.props.maxCellsPerRow}
    >
      {
        React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            parent: design.layout.BOX
          })
        )
      }
    </StyledLayoutBox>
  }
}

LayoutBox.defaultProps = {
  maxCellsPerRow: {
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
  },
  parent: design.layout.NONE
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
  parent: design.layoutPropTypes
}

export default LayoutBox
