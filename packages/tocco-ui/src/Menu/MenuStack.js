import React from 'react'

import Menu from './Menu'
import StyledMenuStack from './StyledMenuStack'

class MenuStack extends Menu {
  render() {
    return (
      <StyledMenuStack>
        {this.getChildren()}
      </StyledMenuStack>
    )
  }
}

export default MenuStack
