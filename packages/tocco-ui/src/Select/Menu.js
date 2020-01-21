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
    margin: 8px -12px;
    width: calc(${props => props.wrapperWidth}px + 22px);
    position: relative;

    .tether-target-attached-top & {
      transform: translateY(-${props => props.wrapperHeight + 6}px);
    }
 }
`

const TetherPosition = () => <div/>

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
        <TetherPosition/>
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
