import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Item from './Item'
import StyledItemAccordion from './StyledItemAccordion'
import {stylingInk, stylingPosition} from '../utilStyles'

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

/**
 * Specify color palette. Default value is 'base'.
 */
ItemAccordion.propTypes['ink'] = PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY])

export default ItemAccordion
