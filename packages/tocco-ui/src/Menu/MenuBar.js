import React from 'react'

import Menu from './Menu'
import StyledMenuBar from './StyledMenuBar'

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
