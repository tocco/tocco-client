import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Item from './Item'
import StyledItemFlyout from './StyledItemFlyout'
import {stylingInk, stylingPosition} from '../utilStyles'

/**
 * Wrap <MenuStack> in <ItemFlyout> if it should be toggleable. Submenu fly out on
 * click and cover subsequent content.
 */
class ItemFlyout extends Item {
  getChildren = () => {
    // eslint-disable-next-line
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {look: this.props.look, ink: this.props.ink})
    })
  }

  render() {
    return (
      <StyledItemFlyout
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
      </StyledItemFlyout>
    )
  }
}

ItemFlyout.defaultProps = {
  isOpen: false,
  isToggleable: true
}

/**
 * Specify color palette. Default value is 'base'.
 */
ItemFlyout.propTypes['ink'] = PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY])

export default ItemFlyout
