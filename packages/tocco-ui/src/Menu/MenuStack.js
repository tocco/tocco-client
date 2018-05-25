import React from 'react'
import {theme} from 'styled-system'

import Menu, {StyledMenu} from './Menu'
import {StyledItemFlyout} from './ItemFlyout'

const StyledMenuStack = StyledMenu.extend`
  && {
    > li > button,
    > li > a {
      border-radius: 0;
      box-shadow: none;
      text-align: left;
      text-transform: none;
      width: 100%;
    }

    > hr {
      border: none;
      border-top: 1px solid ${props => theme('colors.base.text')};
      display: list-item;
      margin: 0;
    }

    > :not(${StyledItemFlyout}) > ul {
      margin-left: 20px;
    }
  }
`

class MenuStack extends Menu {
  render() {
    return (
      <StyledMenuStack>
        {this.getChildren()}
      </StyledMenuStack>
    )
  }
}

export {
  MenuStack as default,
  StyledMenuStack
}
