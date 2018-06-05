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
    // eslint-disable-next-line
    this.props.isToggleable
    && this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    const {
      isToggleable
    } = this.props

    return (
      <div>
        { // eslint-disable-next-line
          React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              isOpen: this.state.isOpen,
              isToggleable: isToggleable,
              toggleOpenState: this.toggleOpenState
            })
          })
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
