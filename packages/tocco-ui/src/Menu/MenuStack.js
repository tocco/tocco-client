import React from 'react'
import {theme} from 'styled-system'

import Menu, {MenuStyles} from './Menu'
import {ItemFlyoutStyles} from './ItemFlyout'

const MenuStackStyles = MenuStyles.extend`
  && {
    > hr {
      display: list-item;
      border-top: 1px solid ${props => theme('colors.base.text')};
      margin: ${props => theme('space.3')} 0;
    }

    > :not(${ItemFlyoutStyles}) > ul {
      margin-left: 20px;
    }
  }
`

class MenuStack extends Menu {
  render() {
    return <MenuStackStyles>{this.childs}</MenuStackStyles>
  }
}

export {
  MenuStack as default,
  MenuStackStyles
}
