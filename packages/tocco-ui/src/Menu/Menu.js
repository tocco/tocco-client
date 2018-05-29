import PropTypes from 'prop-types'
import React from 'react'

import StyledMenu from './StyledMenu'
import {stylingLook} from '../utilStyles'

/**
 * Structure <Button> and <ButtonLink> hierarchically as a Menu.
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
   * Style according Google Material Design. Default value is 'flat'. Possible values: flat|raised
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED])
}

export default Menu
