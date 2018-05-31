import PropTypes from 'prop-types'
import React from 'react'

import StyledMenu from './StyledMenu'
import {stylingLook} from '../utilStyles'

/**
 * Use <Menu> to structure <Button> and <ButtonLink> hierarchically as a menu.
 * <Menu> is an unstyled base class and would normally not be used directly.
 */
class Menu extends React.Component {
  getChildren = () => {
    // eslint-disable-next-line
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {look: this.props.look})
    })
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
  look: stylingLook.FLAT
}

Menu.propTypes = {
  /**
   * Look of all menu items. Default value is 'flat'.
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED])
}

export default Menu
