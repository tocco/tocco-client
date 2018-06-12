import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Item from './Item'
import StyledItemAccordion from './StyledItemAccordion'
import {
  inkPropTypes,
  stylingLook,
  stylingPosition
} from '../utilStyles'

/**
 * Wrap <MenuStack> in <ItemAccordion> if it should be toggleable. Submenu expand and
 * collapse alternating on click and push subsequent content down.
 */
class ItemAccordion extends Item {
  getChildren = () => {
    // eslint-disable-next-line
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {look: this.props.look, ink: this.props.ink})
    })
  }

  render() {
    return (
      <StyledItemAccordion
        innerRef={node => { this.node = node }}
        isOpen={this.state.isOpen}
        isToggleable={this.props.isToggleable}
      >
        <Button
          ink={this.props.ink}
          icon={this.state.isOpen ? 'fa-caret-up' : 'fa-caret-down'}
          iconPosition={stylingPosition.AFTER}
          label={this.props.label}
          look={this.props.look}
          onMouseDown={this.toggleOpenState}
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
  'ink': inkPropTypes,
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

export default ItemAccordion
