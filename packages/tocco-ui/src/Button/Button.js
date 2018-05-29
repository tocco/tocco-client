import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledButton from './StyledButton'
import {
  stylingAnimation,
  stylingInk,
  stylingLook,
  stylingPosition
} from '../utilStyles'

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
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onMouseDown={props.onMouseDown}
      title={props.title}
      type={props.type}
    >
      {props.icon && <Icon
        dense={props.dense}
        icon={props.icon}
        position={props.label.length > 0 ? props.iconPosition : stylingPosition.solely}/>}
      {props.pending && <Icon
        animation={stylingAnimation.SPIN}
        dense={props.dense}
        icon="fa-circle-o-notch"
        position={props.label.length > 0 ? props.iconPosition : stylingPosition.solely}/>}
      <span>{props.label}</span>
    </StyledButton>
  )
}

Button.defaultProps = {
  iconPosition: stylingPosition.BEFORE,
  label: '',
  look: stylingLook.FLAT,
  type: 'button'
}

Button.propTypes = {
  /**
   * May passed from ButtonGroup to use as ink default.
   */
  buttonGroupInk: PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY]),
  /**
   * May passed from ButtonGroup to merge buttons visually.
   */
  buttonGroupMelt: PropTypes.bool,
  /**
   * If true, compress button to occupy less space.
   */
  dense: PropTypes.bool,
  /**
   * If true, the button can not be triggered.
   */
  disabled: PropTypes.bool,
  /**
   * Integrate an icon into the button. Set the specific class only from
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * Add spacing according position. Default value is 'before'. Possible values: before|solely
   */
  iconPosition: PropTypes.oneOf([stylingPosition.AFTER, stylingPosition.BEFORE, stylingPosition.SOLELY]),
  /**
   * Define color palette. Default value is 'base'. Possible values: base|primary
   */
  ink: PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY]),
  /**
   * Visible text. Default is an empty string.
   */
  label: PropTypes.node,
  /**
   * Button style according Google Material Design. Default value is 'flat'. Possible values: flat|raised
   */
  look: PropTypes.oneOf([stylingLook.FLAT, stylingLook.RAISED]),
  /**
   * Set button's name attribute.
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
  * If true, a spinner is integrated in the button.
  */
  pending: PropTypes.bool,
  /**
   * Popover title to be shown on mouse over.
   */
  title: PropTypes.string,
  /**
   * HTML Button type. Default is 'button'. Possible values: button|submit|reset
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button
