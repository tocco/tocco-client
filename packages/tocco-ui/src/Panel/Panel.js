import PropTypes from 'prop-types'
import React from 'react'

import StyledPanel from './StyledPanel'

/**
 * <Panel/> is used to conceal and display related content alternating by interaction and to
 * emphasize close relationship of content.
 */
class Panel extends React.PureComponent {
  state = {
    isOpen: this.props.isOpen
  }

  toggleOpenState = () => {
    if (this.props.isToggleable) {
      if (typeof this.props.onToggle === 'function') {
        this.props.onToggle(!this.state.isOpen)
      }
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }))
    }
  }

  componentDidUpdate() {
    if (typeof this.props.onToggle === 'function') {
      this.setState({isOpen: this.props.isOpen})
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
              isFramed,
              isOpen: this.state.isOpen,
              isToggleable,
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
   * Boolean to control if <Panel.Header/>, <Panel.Body/> and <Panel.Footer/> is bordered.
   * Default value is 'true'.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <Panel.Body/> is initially opened. Default value is 'false'.
   */
  isOpen: PropTypes.bool,
  /**
   * Boolean to control if body can be opened or closed. Default value is 'true'.
   */
  isToggleable: PropTypes.bool,
  /**
   * Function is triggered by componentDidUpdate or by toggleOpenState.
   */
  onToggle: PropTypes.func
}

export default Panel
