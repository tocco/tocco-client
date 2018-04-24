import React from 'react'

import Button from '../Button'
import Item, {ItemStyles as ItemAccordionStyles} from './Item'
import {stylingPosition} from '../utilStyles'

class ItemAccordion extends Item {
  render() {
    return (
      <ItemAccordionStyles
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
        {this.getChildren()}
      </ItemAccordionStyles>
    )
  }
}

Item.defaultProps = {
  isOpen: true,
  isToggable: true
}

export {
  ItemAccordion as default,
  ItemAccordionStyles
}
