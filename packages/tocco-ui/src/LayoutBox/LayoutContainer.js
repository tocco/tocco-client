import PropTypes from 'prop-types'
import React from 'react'

import StyledLayoutContainer from './StyledLayoutContainer'

/*
  TODO
  o remove props.alignment
  o remove props.label
  ✓ add props.maxCellsPerRow
  ✓ make maxCellsPerRow responsive on parents width
 */

/**
 * Use <LayoutContainer/> to apply grid and gutter on <LayoutBox>.
 * Define how many cells are displayed per row and breakpoint.
 */
class LayoutContainer extends React.Component {
  state = {
    containerWidth: undefined
  }

  // get device independent pixel
  getWidth = () => {
    this.setState({
      containerWidth: Math.floor(this.node.offsetWidth / window.devicePixelRatio)
    })
  }
  componentDidMount() {
    this.getWidth()
    window.addEventListener('resize', this.getWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWidth)
  }

  render() {
    return (
      <StyledLayoutContainer
        innerRef={node => { this.node = node }}
        isNestedCorrectly={this.props.parent !== 'LayoutContainer'}
      >
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              containerWidth: this.state.containerWidth,
              maxCellsPerRow: this.props.maxCellsPerRow,
              parent: 'LayoutContainer'
            })
          )
        }
      </StyledLayoutContainer>
    )
  }
}

LayoutContainer.defaultProps = {
  maxCellsPerRow: {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  }
}

LayoutContainer.propTypes = {
  children: PropTypes.node,
  /**
   * Define how many cells are displayed per row at most.
   * The space is distributed equally on cells.
   * Remaining cells fill up the last row completely.
   * Current breakpoints are 500, 1000 and 1500 density independent pixels.
   */
  maxCellsPerRow: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  /* Internal mechanism to determine if nesting is correct. Do never set manually. */
  parent: PropTypes.string
}

export default LayoutContainer
