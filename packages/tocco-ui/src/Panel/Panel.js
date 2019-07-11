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
      if (typeof this.props.toggleOpenStateAsGroup === 'function') {
        this.props.toggleOpenStateAsGroup(this.state.isOpen ? -1 : this.props.panelId)
      }
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }))
    }
  }

  componentDidUpdate() {
    if (typeof this.props.toggleOpenStateAsGroup === 'function') {
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
   * Function gets passed from PanelGroup to ensure that only one Panel is open at one time.
   */
  toggleOpenStateAsGroup: PropTypes.func,
  /**
   * Id is passed from PanelGroup to identify each Panel in a group.
   */
  panelId: PropTypes.number
}

export default Panel
