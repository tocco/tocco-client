import React from 'react'

import Button from '../Button'
import Item from './Item'
import StyledItemFlyout from './StyledItemFlyout'
import {stylingPosition} from '../utilStyles'

/**
 * Wrap <MenuStack> in <ItemFlyout> if it should be toggleable. Submenu fly out on
 * click and cover subsequent content.
 */
class ItemFlyout extends Item {
  render() {
    return (
      <StyledItemFlyout
        innerRef={node => { this.node = node }}
        isOpen={this.state.isOpen}
        isToggleable={this.props.isToggleable}
      >
        <Button
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

export default ItemFlyout
