import React from 'react'

import Button from '../Button'
import Item, {StyledItem as StyledMenuItemAccordion} from './Item'
import {stylingPosition} from '../utilStyles'

class ItemAccordion extends Item {
  render() {
    return (
      <StyledMenuItemAccordion
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
      </StyledMenuItemAccordion>
    )
  }
}

ItemAccordion.defaultProps = {
  isOpen: true,
  isToggleable: true
}

export {
  ItemAccordion as default,
  StyledMenuItemAccordion
}
