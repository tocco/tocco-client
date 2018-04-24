import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'

import {getElevation, stylingInk, stylingLook} from '../utilStyles'

export const StyledButtonGroup = styled.div`
  && {
    display: flex;
    flex-flow: row nowrap;
    width: fit-content;

    border-radius: ${props => props.melt === true ? theme('radii.3') : 0};
    ${props => getElevation(props, props.look === stylingLook.RAISED && props.melt === true ? 1 : 0)}
  }
`

/**
 * ButtonGroup wraps Buttons and controls flow and space.
 */
const ButtonGroup = props => {
  return (
    <StyledButtonGroup look={props.look} melt={props.melt}>
      { // eslint-disable-next-line
        React.Children.map(props.children, child => {
          return React.cloneElement(child, {look: props.look, buttonGroupInk: props.ink, buttonGroupMelt: props.melt})
        })}
    </StyledButtonGroup>
  )
}

ButtonGroup.defaultProps = {
  ink: stylingInk.BASE,
  look: stylingLook.FLAT,
  melt: false
}

ButtonGroup.propTypes = {
  /**
   * Set color palette for all Buttons globally. Ink can be overwritten on Buttons individually.
   * Default value is 'base'. Possible values: base|primary
   */
  ink: PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY]),
  /**
   * Set style for all Buttons globally. Default value is 'flat'. Possible values: flat|raised
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED]),
  /**
   * If true Buttons melt visually into one. Default value is 'false'.
   */
  melt: PropTypes.bool
}

export default ButtonGroup
