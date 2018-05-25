import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'

import {StyledButtonGroup} from '../ButtonGroup'
import Icon from '../Icon'
import {
  declareDensity,
  declareElevation,
  declareFlatBaseColors,
  declareFlatPrimaryColors,
  declareInteractionColors,
  declareOverlay,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors,
  stylingAnimation,
  stylingInk,
  stylingLook,
  stylingPosition
} from '../utilStyles'

const meltButtons = props => {
  let declaration = ''
  if (!props.melt && props.look === stylingLook.RAISED) {
    declaration = `
      &:not(:last-child) {
        margin-right: ${theme('space.4')(props)};
      }
    `
  } else if (props.melt) {
    declaration = `
      border-radius: 0;

      &:first-child {
        border-top-left-radius: ${theme('radii.3')(props)};
        border-bottom-left-radius: ${theme('radii.3')(props)};
      }

      &:last-child {
        border-top-right-radius: ${theme('radii.3')(props)};
        border-bottom-right-radius: ${theme('radii.3')(props)};
      }
    `
  }
  return declaration
}

const declareButtonColor = props => {
  if (props.look === stylingLook.FLAT && props.ink === stylingInk.BASE) {
    return declareInteractionColors(declareFlatBaseColors(props))
  } else if (props.look === stylingLook.FLAT && props.ink === stylingInk.PRIMARY) {
    return declareInteractionColors(declareFlatPrimaryColors(props))
  } else if (props.look === stylingLook.RAISED && props.ink === stylingInk.BASE) {
    return declareInteractionColors(declareRaisedBaseColors(props))
  } else if (props.look === stylingLook.RAISED && props.ink === stylingInk.PRIMARY) {
    return declareInteractionColors(declareRaisedPrimaryColors(props))
  }
}

const declareIconPosition = props => {
  if (props.iconPosition === stylingPosition.AFTER) {
    return `
      justify-content: space-between;
      > span {
        order: -1;
      }
    `
  }
}

export const StyledButton = styled.button`
  && {
    align-items: center;
    background-image: none;
    border-radius: ${theme('radii.3')};
    border: none;
    display: inline-flex;
    margin: 0;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    white-space: nowrap;

    &:enabled {
      cursor: pointer;
    }

    &:disabled {
      ${props => declareOverlay(theme('overlays.disabled.color')(props), theme('overlays.disabled.opacity')(props))}
    }

    &:active,
    &:focus {
      outline: ${theme('outline')};
    }

    ${props => declareButtonColor(props)}
    ${props => declareDensity(props)}
    /*
      SCR_TEMP reactivate
      ${props => declareElevation(props, props.look === stylingLook.RAISED && props.melt !== true ? 1 : 0)}
    */

    ${props => declareIconPosition(props)}

    ${StyledButtonGroup} & {
      ${props => meltButtons(props)}
    }
  }
`

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
        position={props.iconPosition}/>}
      {props.pending && <Icon
        animation={stylingAnimation.SPIN}
        dense={props.dense}
        icon="fa-circle-o-notch"
        position={props.iconPosition}/>}
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
