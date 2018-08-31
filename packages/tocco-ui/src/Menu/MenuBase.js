import PropTypes from 'prop-types'
import React from 'react'

import StyledMenu from './StyledMenu'
import {stylingLook} from '../utilStyles'

class MenuBase extends React.Component {
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

MenuBase.defaultProps = {
  look: stylingLook.FLAT
}

MenuBase.propTypes = {
  /**
   * Look of all menu items. Default value is 'flat'.
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED])
}

export default MenuBase
