import React from 'react'

import Menu from './Menu'
import StyledMenuButton from './StyledMenuButton'

/**
 * Use <MenuButton> to structure <Button> and <ButtonLink> hierarchically as a horizontally separated menu.
 * Utilize it only on top hierarchy. For all subsequent levels must <Menu.Stack> be used.
 */
class MenuButton extends Menu {
  render() {
    return (
      <StyledMenuButton
        look={this.props.look}
      >
        {this.getChildren()}
      </StyledMenuButton>
    )
  }
}

export default MenuButton
