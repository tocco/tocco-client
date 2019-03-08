import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Item from './Item'
import StyledItemAccordion from './StyledItemAccordion'
import {design} from '../utilStyles'

/**
 * Wrap <Menu.Stack> in <MenuItemAccordion> if it should be toggleable. Submenu expand and
 * collapse alternating on click and push subsequent content down.
 */
class ItemAccordion extends Item {
  getChildren = () => {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {look: this.props.look, ink: this.props.ink})
    )
  }

  render() {
    return (
      <StyledItemAccordion
        ref={node => { this.node = node }}
        isOpen={this.state.isOpen}
      >
        <Button
          ink={this.props.ink}
          icon={this.state.isOpen ? 'caret-up' : 'caret-down'}
          iconPosition={design.position.APPEND}
          label={this.props.label}
          look={this.props.look}
          onClick={this.toggleOpenState}
        />
        {this.getChildren()}
      </StyledItemAccordion>
    )
  }
}

ItemAccordion.defaultProps = {
  isOpen: true,
  isToggleable: true
}

ItemAccordion.propTypes = {
  /**
   * Specify color palette. Default value is 'base'.
   */
  'ink': design.inkPropTypes,
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
  look: PropTypes.oneOf([design.look.FLAT, design.look.RAISED])
}

export default ItemAccordion
