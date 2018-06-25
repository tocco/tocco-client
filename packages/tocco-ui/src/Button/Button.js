import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledButton from './StyledButton'
import {
  inkPropTypes,
  stylingAnimation,
  stylingInk,
  stylingLook,
  stylingPosition
} from '../utilStyles'

/**
 * Use <Button> to trigger any actions. Choose look and ink according Material Design.
 */
const Button = props => {
  return (
    <StyledButton
      dense={props.dense}
      disabled={props.disabled}
      iconPosition={props.iconPosition}
      ink={props.ink || props.buttonGroupInk || stylingInk.BASE}
      look={props.look}
      melt={props.buttonGroupMelt}
      name={props.name}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      title={props.title}
      type={props.type}
    >
      {props.icon && <Icon
        dense={props.dense}
        icon={props.icon}
        position={props.label ? props.iconPosition : stylingPosition.solely}/>}
      {props.pending && <Icon
        animation={stylingAnimation.SPIN}
        dense={props.dense}
        icon="fa-spinner"
        position={props.label ? props.iconPosition : stylingPosition.solely}/>}
      {props.label && <span>{props.label}</span>}
    </StyledButton>
  )
}

Button.defaultProps = {
  iconPosition: stylingPosition.BEFORE,
  look: stylingLook.FLAT,
  type: 'button'
}

Button.propTypes = {
  /**
   * May be passed from <ButtonGroup> to use as default for ink. Do not set manually.
   */
  buttonGroupInk: inkPropTypes,
  /**
   * May be passed from <ButtonGroup> to morph buttons into a split button. Do not set manually.
   */
  buttonGroupMelt: PropTypes.bool,
  /**
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * If true, the button can not be triggered. Disable a button rather than hide it temporarily.
   */
  disabled: PropTypes.bool,
  /**
   * Display an icon alongside button label. It is possible to omit label text if a icon is chosen. Utilize
   * Glyphicon of Bootstrap 3.7 or Font Awesome 4.7 by setting specific classname (e.g. "bars")
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * Position icon before or after label. Use 'solely' if label text is omitted. Default value is 'before'.
   * Possible values: after|before|solely
   */
  iconPosition: PropTypes.oneOf([stylingPosition.AFTER, stylingPosition.BEFORE, stylingPosition.SOLELY]),
  /**
   * Specify color palette. Default value is 'base'.
   */
  ink: inkPropTypes,
  /**
   * Describe button action concise. Default is ''.
   */
  label: PropTypes.node,
  /**
   * Look of button. Default value is 'flat'.
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED]),
  /**
   * Set button's name for internal references.
   */
  name: PropTypes.string,
  /**
   * Function that will be triggered on click event.
   */
  onClick: PropTypes.func,
  /**
   * Function that will be triggered on mouse enter event.
   */
  onMouseEnter: PropTypes.func,
  /**
   * Function that will be triggered on mouse leave event.
   */
  onMouseLeave: PropTypes.func,
  /**
   * Function that will be triggered on mouse down event.
   */
  onMouseDown: PropTypes.func,
  /**
  * If true, an animated spinner icon is prepended.
  */
  pending: PropTypes.bool,
  /**
   * Describe button action in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string,
  /**
   * HTML Button type. Default is 'button'.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button
