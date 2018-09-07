import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Item from './Item'
import StyledItemFlyout from './StyledItemFlyout'
import {stylingInk, stylingLook, stylingPosition} from '../utilStyles'

/**
 * Wrap <MenuStack> in <MenuItemFlyout> if it should be toggleable. Submenu fly out on
 * click and cover subsequent content.
 */
class ItemFlyout extends Item {
  getChildren = () => {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {look: this.props.look, ink: this.props.ink})
    )
  }

  render() {
    return (
      <StyledItemFlyout
        innerRef={node => { this.node = node }}
        isOpen={this.state.isOpen}
      >
        <Button
          ink={this.props.ink}
          icon={this.state.isOpen ? 'fa-caret-up' : 'fa-caret-down'}
          iconPosition={stylingPosition.APPEND}
          label={this.props.label}
          look={this.props.look}
          onClick={this.toggleOpenState}
        />
        {this.getChildren()}
      </StyledItemFlyout>
    )
  }
}

ItemFlyout.defaultProps = {
  isOpen: false,
  isToggleable: true
}

ItemFlyout.propTypes = {
  /**
   * Specify color palette. Default value is 'base'.
   */
  'ink': PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY]),
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

export default ItemFlyout
