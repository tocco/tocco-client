import React from 'react'
import {theme} from 'styled-system'

import Menu, {MenuStyles} from './Menu'

const MenuButtonStyles = MenuStyles.extend`
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
      margin-right: ${props => props.look === 'raised' ? theme('space.4') : ''};
    }
  }
`

class MenuButton extends Menu {
  render() {
    return (
      <MenuButtonStyles
        look={this.props.look}
      >
        {this.childs}
      </MenuButtonStyles>
    )
  }
}

export {
  MenuButton as default,
  MenuButtonStyles
}
