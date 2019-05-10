import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TetherComponent from 'react-tether'
import {components} from 'react-select'
import _omit from 'lodash/omit'

import {
  scale
} from '../utilStyles'

const StyledTether = styled(TetherComponent)`
&& {
  z-index: 10000000000000;
`

const StyledMenu = styled(components.Menu)`
 && {
    margin: calc(${scale.space(-2)} + 1px) calc(-${scale.space(-1)} - 1px);
    width: calc(${props => props.wrapperWidth}px + 2px + ${scale.space(0)});
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
