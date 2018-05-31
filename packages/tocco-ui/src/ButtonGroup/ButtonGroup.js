import PropTypes from 'prop-types'
import React from 'react'

import StyledButtonGroup from './StyledButtonGroup'
import {
  stylingInk,
  stylingLook
} from '../utilStyles'

/**
 * Wrap <Button> and <ButtonLink> into <ButtonGroup> to control flow and style.
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
   * Specify color palette for buttons globally. Ink can be overwritten on <Button> individually.
   * Default value is 'base'.
   */
  ink: PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY]),
  /**
   * Specify look for buttons globally. Default value is 'flat'.
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED]),
  /**
   * If true buttons morphs into a split button. Default value is 'false'.
   */
  melt: PropTypes.bool.isRequired
}

export default ButtonGroup
