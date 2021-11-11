import React from 'react'
import PropTypes from 'prop-types'
import _omit from 'lodash/omit'

import {StyledMenu} from './StyledComponents'

const Menu = props => (
  <StyledMenu
    {...(_omit(props, ['innerRef']))}>
    {props.children}
  </StyledMenu>
)

Menu.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    wrapperHeight: PropTypes.number,
    wrapperWidth: PropTypes.number
  })
}

export default Menu
