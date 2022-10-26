import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TetherComponent from 'react-tether'
import {components} from 'react-select'
import _omit from 'lodash/omit'

export const StyledTether = styled(TetherComponent)`
  && {
    z-index: 99999999 !important;
  }
`

const StyledMenu = styled(components.Menu)`
  && {
    margin: 8px -12px;
    width: calc(${({wrapperWidth}) => wrapperWidth}px + 22px);
    position: relative;

    .tether-target-attached-top & {
      transform: translateY(-${({wrapperHeight}) => wrapperHeight + 6}px);
    }
  }
`

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
