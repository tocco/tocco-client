import PropTypes from 'prop-types'
import React from 'react'

import StyledItem from './StyledItem'
import {design} from '../utilStyles'

/**
 * Wrap all <Button> and <ButtonLink> in <Item>.
 */
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {isOpen: props.isOpen}
  }

  getChildren = () => {
    // eslint-disable-next-line
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {look: this.props.look})
    })
  }

  handleClickOutside = event => {
    if (!this.node.contains(event.target)) {
      this.toggleOpenState()
    }
  }

  toggleOpenState = () => {
    if (this.props.onToggle) {
      this.props.onToggle(this.state.isOpen)
    }

    if (this.props.isToggleable) {
      if (this.state.isOpen) {
        document.removeEventListener('mousedown', this.handleClickOutside, false)
      } else {
        document.addEventListener('mousedown', this.handleClickOutside, false)
      }

      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }))
    }
  }

  componentDidMount() {
    if (this.props.isToggleable && this.state.isOpen) {
      document.addEventListener('mousedown', this.handleClickOutside, false)
    }
  }

  componentWillUnmount() {
    if (this.props.isToggleable && this.state.isOpen) {
      document.removeEventListener('mousedown', this.handleClickOutside, false)
    }
  }

  render() {
    return (
      <StyledItem
        ref={this.ref}
        isOpen={this.state.isOpen}
      >
        {this.getChildren()}
      </StyledItem>
    )
  }
}

Item.defaultProps = {
  isOpen: true,
  isToggleable: false
}

Item.propTypes = {
  /**
   * Boolean to control if a submenu is initially opened. Default value is 'true'.
   */
  isOpen: PropTypes.bool,
  /**
   * Boolean to control if a user can change the open state. Default value is 'false'.
   */
  isToggleable: PropTypes.bool,
  /**
   * Look of menu item. Default value is 'flat'. Value is always overridden by parent element.
   */
  look: PropTypes.oneOf([design.look.FLAT, design.look.RAISED]),
  /**
   * Optional callback that is called, if menu changes state between open / close.
   */
  onToggle: PropTypes.func

}

export default Item
