import React from 'react'
import PropTypes from 'prop-types'
import _omit from 'lodash/omit'

import {StyledTether, StyledMenu} from './StyledComponents'

const TetherPosition = () => <div/>

const Menu = props => (
  <StyledTether
    attachment="top left"
    targetAttachment="bottom left"
    constraints={[{
      to: 'window',
      attachment: 'together'
    }]}
  >
    <TetherPosition/>
    <div>
      <StyledMenu
        {...(_omit(props, ['innerRef']))}
        wrapperWidth={props.selectProps.wrapperWidth}
        wrapperHeight={props.selectProps.wrapperHeight}>
        {props.children}
      </StyledMenu>
    </div>
  </StyledTether>
)

Menu.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    wrapperHeight: PropTypes.number,
    wrapperWidth: PropTypes.number
  })
}

export default Menu
