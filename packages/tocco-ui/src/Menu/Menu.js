import PropTypes from 'prop-types'
import React from 'react'

import StyledMenu from './StyledMenu'
import {design} from '../utilStyles'

export class Menu extends React.Component {
  getChildren = () => {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {look: this.props.look})
    )
  }

  render() {
    return (
      <StyledMenu>
        {this.getChildren()}
      </StyledMenu>
    )
  }
}

Menu.defaultProps = {
  look: design.look.FLAT
}

Menu.propTypes = {
  /**
   * Look of all menu items. Default value is 'flat'.
   */
  look: PropTypes.oneOf([design.look.FLAT, design.look.RAISED]),
  children: PropTypes.node
}

export default Menu
