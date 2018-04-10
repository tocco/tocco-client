import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

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
  childs // eslint-disable-next-line
  = React.Children.map(this.props.children, child => {
    return React.cloneElement(child, {look: this.props.look})
  })

  render() {
    return <MenuStyles>{this.childs}</MenuStyles>
  }
}

Menu.defaultProps = {
  look: 'flat'
}

Menu.propTypes = {
  /**
   * Style according Google Material Design. Default value is 'flat'. Possible values: flat|raised
   */
  look: PropTypes.oneOf(['flat', 'raised'])
}

export {
  Menu as default,
  MenuStyles
}
