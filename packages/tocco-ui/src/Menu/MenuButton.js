import React from 'react'

import Menu from './Menu'
import StyledMenuButton from './StyledMenuButton'

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
