import React from 'react'
import {theme} from 'styled-system'

import Menu, {StyledMenu} from './Menu'
import {stylingLook} from '../utilStyles'

const StyledMenuButton = StyledMenu.extend`
  && {
    display: inline-flex;
    flex-flow: row nowrap;

    > hr {
      height: auto;
      border: none;
      border-left: 1px solid ${props => theme('colors.base.text')};
    }

    > li:not(:last-child),
    > hr:not(:last-child) {
      margin: 0;
      margin-right: ${props => props.look === stylingLook.RAISED ? theme('space.4') : ''};
    }
  }
`

class MenuButton extends Menu {
  render() {
    return (
      <StyledMenuButton
        look={this.props.look}
      >
        {this.getChildren()}
      </StyledMenuButton>
    )
  }
}

export {
  MenuButton as default,
  StyledMenuButton
}
