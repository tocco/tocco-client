import React from 'react'

import Menu from './Menu'
import StyledMenuStack from './StyledMenuStack'

/**
 * Use <Menu.Stack> to structure <Button> hierarchically as a vertical menu.
 * <Menu.Stack> can be utilized on levels of hierarchy.
 */
class MenuStack extends Menu {
  render() {
    return (
      <StyledMenuStack>
        {this.getChildren()}
      </StyledMenuStack>
    )
  }
}

export default MenuStack
