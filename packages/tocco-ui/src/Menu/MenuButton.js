import React from 'react'
import {theme} from 'styled-system'

import Menu, {StyledMenu} from './Menu'
import {stylingLook} from '../utilStyles'

const StyledMenuButton = StyledMenu.extend`
  && {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: -${props => props.look === stylingLook.RAISED ? theme('space.4') : 0};

    > hr {
      border: none;
      border-left: 1px solid ${props => theme('colors.base.text')};
      display: list-item;
      height: auto;
      margin: 0;
    }

    > li,
    > hr {
      margin-bottom: ${props => props.look === stylingLook.RAISED ? theme('space.4') : 0};

      :not(:last-child) {
        margin-right: ${props => props.look === stylingLook.RAISED ? theme('space.4') : ''};
      }
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
