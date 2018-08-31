import React from 'react'

import MenuBase from './MenuBase'
import StyledMenuBar from './StyledMenuBar'

/**
 * Use <Menu.Bar> to structure <Button> and <ButtonLink> hierarchically as a horizontally molten menu.
 * Utilize it only on top hierarchy. For all subsequent levels must <Menu.Stack> be used.
 */
class MenuBar extends MenuBase {
  render() {
    return (
      <StyledMenuBar
        look={this.props.look}
      >
        {this.getChildren()}
      </StyledMenuBar>
    )
  }
}

export default MenuBar
