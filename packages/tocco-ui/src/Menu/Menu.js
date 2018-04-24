import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {stylingLook} from '../utilStyles'

const MenuStyles = styled.ul`
  && {
    margin: 0;
    padding: 0;
    list-style: none;
    /* width: fit-content; best option for dense mode but not supported for IE */
  }
`

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
      <MenuStyles>
        {this.getChildren()}
      </MenuStyles>
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

export {
  Menu as default,
  MenuStyles
}
