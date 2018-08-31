import React from 'react'

import MenuBase from './MenuBase'
import StyledMenuButton from './StyledMenuButton'

/**
 * Use <Menu.Button> to structure <Button> and <ButtonLink> hierarchically as a horizontally separated menu.
 * Utilize it only on top hierarchy. For all subsequent levels must <Menu.Stack> be used.
 */
class MenuButton extends MenuBase {
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
