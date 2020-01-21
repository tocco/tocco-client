import React from 'react'

import Menu from './Menu'
import StyledMenuButtonGroup from './StyledMenuButtonGroup'

/**
 * Use <Menu.ButtonGroup> to morph <Button> into a split button.
 * Utilize it only as grandchild of <Menu.Button> and wrap each <Menu.ButtonGroup> in an <Item>.
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
