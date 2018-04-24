import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'

import Icon from '../Icon'
import {StyledButtonGroup} from '../ButtonGroup'
import {StyledMenuBar, StyledMenuStack} from '../Menu'
import {getElevation, stylingAnimation, stylingLook, stylingInk, stylingPosition} from '../utilStyles'

const setButtonDensity = props => {
  if (props.dense) {
    return `
      line-height: ${theme('lineHeights.0')(props)};
      padding: ${theme('space.2')(props)} ${theme('space.2')(props)};
    `
  } else {
    return `
      line-height: ${theme('lineHeights.1')(props)};
      padding: ${theme('space.3')(props)} ${theme('space.4')(props)};
    `
  }
}

const setButtonColor = props => {
  let defaultColor,
    defaultBackground,
    focusColor,
    focusBackground,
    activeColor,
    activeBackground

  if (props.look === stylingLook.FLAT && props.ink === stylingInk.BASE) {
    defaultColor = theme('colors.base.text')(props)
    defaultBackground = theme('colors.base.paper')(props)
    focusColor = theme('colors.base.line.1')(props)
    focusBackground = theme('colors.base.fill.0')(props)
    activeColor = theme('colors.base.line.2')(props)
    activeBackground = theme('colors.base.fill.1')(props)
  } else if (props.look === stylingLook.FLAT && props.ink === stylingInk.PRIMARY) {
    defaultColor = theme('colors.primary.line.0')(props)
    defaultBackground = theme('colors.base.paper')(props)
    focusColor = theme('colors.primary.line.1')(props)
    focusBackground = theme('colors.base.fill.0')(props)
    activeColor = theme('colors.primary.line.2')(props)
    activeBackground = theme('colors.base.fill.1')(props)
  } else if (props.look === stylingLook.RAISED && props.ink === stylingInk.BASE) {
    defaultColor = theme('colors.base.line.0')(props)
    defaultBackground = theme('colors.base.fill.0')(props)
    focusColor = theme('colors.base.line.1')(props)
    focusBackground = theme('colors.base.fill.1')(props)
    activeColor = theme('colors.base.line.2')(props)
    activeBackground = theme('colors.base.fill.2')(props)
  } else if (props.look === stylingLook.RAISED && props.ink === stylingInk.PRIMARY) {
    defaultColor = theme('colors.primary.fillContrast.0', false)(props)
    if (!defaultColor) {
      defaultColor = theme('colors.base.line.0')(props)
    }
    defaultBackground = theme('colors.primary.fill.0')(props)
    focusColor = theme('colors.primary.fillContrast.1', false)(props)
    if (!focusColor) {
      focusColor = theme('colors.base.line.1')(props)
    }
    focusBackground = theme('colors.primary.fill.1')(props)
    activeColor = theme('colors.primary.fillContrast.2', false)(props)
    if (!activeColor) {
      activeColor = theme('colors.base.line.2')(props)
    }
    activeBackground = theme('colors.primary.fill.2')(props)
  } else {
    throw new Error('invalid props combination in setButtonColor: ', props)
  }

  return `
    background-color: ${defaultBackground};
    color: ${defaultColor};

    &:enabled {
        &:hover,
        &:focus {
            background-color: ${focusBackground};
            color: ${focusColor};
        }
        &:active {
            background-color: ${activeBackground};
            color: ${activeColor};
        }
    }
  `
}

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

const setIconPosition = props => {
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
    background-image: none;
    border-radius: ${theme('radii.3')};
    border: none;
    display: inline-flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    white-space: nowrap;
    margin: 0;

    &:enabled {
      cursor: pointer;
    }

    &:disabled {
      opacity: ${theme('opacities.disabled')};
    }

    &:active,
    &:focus {
      outline: ${theme('outline')};
    }

    ${props => setButtonColor(props)}
    ${props => setButtonDensity(props)}
    ${props => getElevation(props, props.look === stylingLook.RAISED && props.melt !== true ? 1 : 0)}

    ${StyledButtonGroup} & {
      ${props => meltButtons(props)}
    }

    ${StyledMenuBar} &,
    ${StyledMenuStack} & {
      border-radius: 0;
      box-shadow: none;
      text-align: left;
      text-transform: none;
    }

    ${StyledMenuStack} & {
      width: 100%;
    }

    ${props => setIconPosition(props)}
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
