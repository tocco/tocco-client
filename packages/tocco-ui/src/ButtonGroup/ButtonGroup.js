import PropTypes from 'prop-types'
import React from 'react'

import StyledButtonGroup from './StyledButtonGroup'
import {
  stylingInk,
  stylingLook
} from '../utilStyles'

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
