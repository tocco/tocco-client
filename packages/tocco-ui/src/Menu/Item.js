import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {stylingLook} from '../utilStyles'

const ItemStyles = styled.li`
  position: relative;

  > ul {
    display: ${props => props.isOpen ? 'block' : 'none'}
  }
`

class Item extends React.Component {
  state = {
    isOpen: this.props.isOpen
  }

  toogleOpenState = () => {
    // eslint-disable-next-line
    this.props.isToggable
    && this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  getChildren = () => {
    // eslint-disable-next-line
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {look: this.props.look})
    })
  }

  render() {
    return (
      <ItemStyles
        isOpen={this.state.isOpen}
        isToggable={this.props.isToggable}
      >
        {this.getChildren()}
      </ItemStyles>
    )
  }
}

Item.defaultProps = {
  isOpen: true,
  isToggable: false
}

Item.propTypes = {
  /**
   * Boolean to control if a submenu is initially opened. Default value is 'true'.
   */
  isOpen: PropTypes.bool,
  /**
   * Boolean to control if a user can change the open state. Default value is 'false'.
   */
  isToggable: PropTypes.bool,
  /**
   * Style according Google Material Design. Value is always overridden by parent element.
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED])
}

export {
  Item as default,
  ItemStyles
}
