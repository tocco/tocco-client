import React from 'react'
import {theme} from 'styled-system'

import Menu, {StyledMenu} from './Menu'
import {StyledItemFlyout} from './ItemFlyout'

const StyledMenuStack = StyledMenu.extend`
  && {
    > hr {
      display: list-item;
      border-top: 1px solid ${props => theme('colors.base.text')};
      margin: ${props => theme('space.3')} 0;
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
