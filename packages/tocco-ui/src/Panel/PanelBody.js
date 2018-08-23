import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelBody from './StyledPanelBody'

/**
 * Only <PanelBody/> is affected by the visibility state.
 */
class PanelBody extends React.Component {
  state = {
    heightIfOpen: undefined
  }

  getHeight = () => {
    this.node.setAttribute('style', 'height: auto; animation: none;')
    this.setState({
      heightIfOpen: `${this.node.offsetHeight}px`
    })
    this.node.removeAttribute('style')
  }

  componentDidMount() {
    this.getHeight()
    window.addEventListener('resize', this.getHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getHeight)
  }

  render() {
    const {
      children,
      isFramed,
      isOpen
    } = this.props

    return (
      <StyledPanelBody
        isFramed={isFramed}
        isOpen={isOpen}
        innerRef={node => { this.node = node }}
        heightIfOpen={this.state.heightIfOpen}
      >
        <div>{React.Children.map(children, child => React.cloneElement(child))}</div>
      </StyledPanelBody>
    )
  }
}

PanelBody.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <PanelHeader/>, <PanelBody/> and <PanelFooter/> is initially opened.
   * Value is always overridden by parent element.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <PanelBody/> is initially opened. Value is always overridden by parent element.
   */
  isOpen: PropTypes.bool
}

export default PanelBody
