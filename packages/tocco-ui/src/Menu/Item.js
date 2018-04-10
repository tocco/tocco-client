import PropTypes from 'prop-types'
import React from 'react'

import StyledItem from './StyledItem'
import {stylingLook} from '../utilStyles'

/**
 * Wrap all <Button> and <ButtonLink> in <Item>.
 */
class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isOpen: props.isOpen}
    if (props.isOpen) { document.addEventListener('mousedown', this.handleClickOutside, false) }
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
    // eslint-disable-next-line
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

  render() {
    return (
      <StyledItem
        innerRef={node => { this.node = node }}
        isOpen={this.state.isOpen}
        isToggleable={this.props.isToggleable}
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
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED])
}

export default Item
