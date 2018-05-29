import React from 'react'

import Button from '../Button'
import Item from './Item'
import StyledItemAccordion from './StyledItemAccordion'
import {stylingPosition} from '../utilStyles'

class ItemAccordion extends Item {
  render() {
    return (
      <StyledItemAccordion
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
      </StyledItemAccordion>
    )
  }
}

ItemAccordion.defaultProps = {
  isOpen: true,
  isToggleable: true
}

export default ItemAccordion
