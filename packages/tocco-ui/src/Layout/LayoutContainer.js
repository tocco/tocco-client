import PropTypes from 'prop-types'
import React from 'react'

import StyledLayoutContainer from './StyledLayoutContainer'
import {design} from '../utilStyles'

/**
 * Use <Layout.Container/> to apply grid and gutter on <Layout.Box>.
 * Define how many cells are displayed per row and breakpoint.
 */
class LayoutContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {}
  }

  setDeviceIndependentPixelWidth = () => {
    this.setState({
      containerWidth: Math.floor(this.ref.current.offsetWidth / window.devicePixelRatio)
    })
  }

  componentDidMount() {
    this.setDeviceIndependentPixelWidth()
    window.addEventListener('resize', this.setDeviceIndependentPixelWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setDeviceIndependentPixelWidth)
  }

  render() {
    return (
      <StyledLayoutContainer
        ref={this.ref}
        isNestedCorrectly={this.props.parent !== design.layout.CONTAINER}
      >
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              containerWidth: this.state.containerWidth,
              maxCellsPerRow: this.props.maxCellsPerRow,
              parent: design.layout.CONTAINER
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
  },
  parent: design.layout.NONE
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
  parent: design.layoutPropTypes
}

export default LayoutContainer
