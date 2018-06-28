import PropTypes from 'prop-types'
import React from 'react'

import StyledPanel from './StyledPanel'

/**
 * <Panel/> is used to conceal and display related content alternating by interaction and to
 * emphasize close relationship of content.
 */
class Panel extends React.Component {
  state = {
    isOpen: this.props.isOpen
  }

  toggleOpenState = () => {
    if (this.props.isToggleable) {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }))
    }
  }

  render() {
    const {
      isFramed,
      isToggleable
    } = this.props

    return (
      <StyledPanel
        isFramed={isFramed}
      >
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              isFramed: isFramed,
              isOpen: this.state.isOpen,
              isToggleable: isToggleable,
              toggleOpenState: this.toggleOpenState
            })
          )
        }
      </StyledPanel>
    )
  }
}

Panel.defaultProps = {
  isFramed: true,
  isOpen: false,
  isToggleable: true
}

Panel.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <PanelHeader/>, <PanelBody/> and <PanelFooter/> is initially opened.
   * Default value is 'false'.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <PanelBody/> is initially opened. Default value is 'true'.
   */
  isOpen: PropTypes.bool,
  /**
   * Boolean to control if body can be opened or closed. Default value is 'true'.
   */
  isToggleable: PropTypes.bool
}

export default Panel
