import React from 'react'

import Menu from './Menu'
import StyledMenuStack from './StyledMenuStack'

/**
 * Use <MenuStack> to structure <Button> and <ButtonLink> hierarchically as a vertical menu.
 * <MenuStack> can be utilized on levels of hierarchy.
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
