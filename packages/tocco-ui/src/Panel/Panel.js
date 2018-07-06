import PropTypes from 'prop-types'
import React from 'react'

/**
 * <Panel/> is used to conceal and display related content alternating by interaction.
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
    return (
      <div>
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              isOpen: this.state.isOpen,
              isToggleable: this.props.isToggleable,
              toggleOpenState: this.toggleOpenState
            })
          )
        }
      </div>
    )
  }
}

Panel.defaultProps = {
  isOpen: false,
  isToggleable: true
}

Panel.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <PanelBody/> is initially opened. Default value is 'false'.
   */
  isOpen: PropTypes.bool,
  /**
   * Boolean to control if body can be opened or closed. Default value is 'true'.
   */
  isToggleable: PropTypes.bool
}

export default Panel
