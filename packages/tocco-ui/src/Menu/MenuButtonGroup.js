import React from 'react'

import Menu from './Menu'
import StyledMenuButtonGroup from './StyledMenuButtonGroup'

/**
 * Use <MenuButtonGroup> to morph <Button> and <ButtonLink> into a split button.
 * Utilize it only as grandchild of <MenuButton> and wrap each <MenuButtonGroup> in an <Item>.
 */

class MenuButtonGroup extends Menu {
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
