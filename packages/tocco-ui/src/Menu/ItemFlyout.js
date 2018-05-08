
import React from 'react'
import {theme} from 'styled-system'

import Button from '../Button'
import Item, {StyledItem} from './Item'
import {getElevation, stylingPosition} from '../utilStyles'

const StyledItemFlyout = StyledItem.extend`
  > ul {
    position: absolute;
    top: calc(100% + ${props => theme('space.2')});
    left: 0;
    z-index: 1;
    background-color: ${props => theme('colors.base.paper')};

    ${props => getElevation(props, 1)}

    ul {
      top: 0;
      left: calc(100% + ${props => theme('space.2')});
      right: auto;
    }
  }
`
class ItemFlyout extends Item {
  render() {
    return (
      <StyledItemFlyout
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

Item.defaultProps = {
  isOpen: false,
  isToggleable: true
}

export {
  ItemFlyout as default,
  StyledItemFlyout
}
