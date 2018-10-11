import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TetherComponent from 'react-tether'
import {components} from 'react-select'
import _omit from 'lodash/omit'

const StyledTether = styled(TetherComponent)`
&& {
  z-index: 10000000000000;
`

const StyledMenu = styled(components.Menu)`
 && {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
     margin-bottom: 0px;
     margin-top: 3px;
     width: ${props => props.wrapperWidth}px;
     position: inherit;
    .tether-target-attached-top & { 
      transform: translateY(-${props => props.wrapperHeight + 6}px);
    }
 }
`

class Menu extends React.Component {
  render() {
    const props = this.props
    return (
      <StyledTether
        attachment="top left"
        targetAttachment="bottom left"
        constraints={[{
          to: 'window',
          attachment: 'together'
        }]}
      >
        <div></div>
        <div>
          <StyledMenu {...(_omit(props, ['innerRef']))}>
            {props.children}
          </StyledMenu>
        </div>
      </StyledTether>
    )
  }
}

Menu.propTypes = {
  children: PropTypes.node
}

export default Menu
