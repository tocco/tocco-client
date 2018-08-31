import React from 'react'

import MenuBase from './MenuBase'
import StyledMenuStack from './StyledMenuStack'

/**
 * Use <MenuStack> to structure <Button> and <ButtonLink> hierarchically as a vertical menu.
 * <MenuStack> can be utilized on levels of hierarchy.
 */
class MenuStack extends MenuBase {
  render() {
    return (
      <StyledMenuStack>
        {this.getChildren()}
      </StyledMenuStack>
    )
  }
}

export default MenuStack
