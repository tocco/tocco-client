
import React from 'react'
import {theme} from 'styled-system'

import Button from '../Button'
import Item, {ItemStyles} from './Item'
import {getElevation, stylingPosition} from '../utilStyles'

const ItemFlyoutStyles = ItemStyles.extend`
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
      <ItemFlyoutStyles
        isOpen={this.state.isOpen}
        isToggable={this.props.isToggable}
      >
        <Button
          icon={this.state.isOpen ? 'fa-caret-up' : 'fa-caret-down'}
          iconPosition={stylingPosition.AFTER}
          label={this.props.label}
          look={this.props.look}
          onMouseDown={this.toogleOpenState}
        />
        {this.childs}
      </ItemFlyoutStyles>
    )
  }
}

Item.defaultProps = {
  isOpen: false,
  isToggable: true
}

export {
  ItemFlyout as default,
  ItemFlyoutStyles
}
