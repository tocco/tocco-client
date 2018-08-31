import React from 'react'

import MenuBase from './MenuBase'
import StyledMenuButtonGroup from './StyledMenuButtonGroup'

/**
 * Use <MenuButtonGroup> to morph <Button> and <ButtonLink> into a split button.
 * Utilize it only as grandchild of <MenuButton> and wrap each <MenuButtonGroup> in an <Item>.
 */

class MenuButtonGroup extends MenuBase {
  render() {
    return (
      <StyledMenuButtonGroup
        look={this.props.look}
      >
        {this.getChildren()}
      </StyledMenuButtonGroup>
    )
  }
}

export default MenuButtonGroup
