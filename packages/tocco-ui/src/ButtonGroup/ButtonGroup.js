import PropTypes from 'prop-types'
import React from 'react'

import StyledButtonGroup from './StyledButtonGroup'
import {design} from '../utilStyles'

/**
 * Wrap <Button> and <ButtonLink> into <ButtonGroup> to control flow and style.
 */
const ButtonGroup = props => {
  return (
    <StyledButtonGroup melt={props.melt}>
      { // eslint-disable-next-line
        React.Children.map(props.children, child => {
          return child && React.cloneElement(child, {
            look: props.look, buttonGroupInk: props.ink, buttonGroupMelt: props.melt})
        })}
    </StyledButtonGroup>
  )
}

ButtonGroup.defaultProps = {
  ink: design.ink.BASE,
  look: design.look.FLAT,
  melt: false
}

ButtonGroup.propTypes = {
  /**
   * Specify color palette for buttons globally. Ink can be overwritten on <Button> individually.
   * Default value is 'base'.
   */
  ink: design.inkPropTypes,
  /**
   * Specify look for buttons globally. Default value is 'flat'.
   */
  look: PropTypes.oneOf([design.look.FLAT, design.look.RAISED]),
  /**
   * If true buttons morphs into a split button. Default value is 'false'.
   */
  melt: PropTypes.bool.isRequired
}

export default ButtonGroup
