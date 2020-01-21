import React from 'react'

import Menu from './Menu'
import StyledMenuBar from './StyledMenuBar'

/**
 * Use <Menu.Bar> to structure <Button> hierarchically as a horizontally molten menu.
 * Utilize it only on top hierarchy. For all subsequent levels must <Menu.Stack> be used.
 */
class MenuBar extends Menu {
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
