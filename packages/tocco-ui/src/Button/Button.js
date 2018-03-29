import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'
import Icon from '../Icon'
import {getElevation} from '../utilStyles'

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

  if (props.look === 'flat' && props.ink === 'base') {
    defaultColor = theme('colors.base.text')(props)
    defaultBackground = theme('colors.base.paper')(props)
    focusColor = theme('colors.base.line.1')(props)
    focusBackground = theme('colors.base.fill.0')(props)
    activeColor = theme('colors.base.line.2')(props)
    activeBackground = theme('colors.base.fill.1')(props)
  } else if (props.look === 'flat' && props.ink === 'primary') {
    defaultColor = theme('colors.primary.line.0')(props)
    defaultBackground = theme('colors.base.paper')(props)
    focusColor = theme('colors.primary.line.1')(props)
    focusBackground = theme('colors.base.fill.0')(props)
    activeColor = theme('colors.primary.line.2')(props)
    activeBackground = theme('colors.base.fill.1')(props)
  } else if (props.look === 'raised' && props.ink === 'base') {
    defaultColor = theme('colors.base.line.0')(props)
    defaultBackground = theme('colors.base.fill.0')(props)
    focusColor = theme('colors.base.line.1')(props)
    focusBackground = theme('colors.base.fill.1')(props)
    activeColor = theme('colors.base.line.2')(props)
    activeBackground = theme('colors.base.fill.2')(props)
  } else if (props.look === 'raised' && props.ink === 'primary') {
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

export const ButtonStyles = styled.button`
  && {
    background-image: none;
    border-radius: ${theme('radii.2')};
    border: none;
    display: inline-block;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    white-space: nowrap;

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
    ${props => getElevation(props, props.look === 'raised' ? 1 : 0)}
  }
`

const Button = props => {
  return (
    <ButtonStyles
      name={props.name}
      title={props.title}
      onClick={props.onClick}
      className={props.className}
      disabled={props.disabled}
      type={props.type}
      style={props.style}
      look={props.look}
      ink={props.ink}
      dense={props.dense}
    >
      {props.icon && <Icon dense={props.dense} icon={props.icon} position="before"/>}
      {props.pending && <Icon animation="spin" dense={props.dense} icon="fa-circle-o-notch" position="before"/>}
      {props.label}
    </ButtonStyles>
  )
}

Button.defaultProps = {
  look: 'flat',
  ink: 'base',
  label: '',
  type: 'button'
}

Button.propTypes = {
  /**
   * Visible text. Default is an empty string.
   */
  label: PropTypes.node,
  /**
   * Function that will be triggered on click event.
   */
  onClick: PropTypes.func,
  /**
   * Set button's name attribute.
   */
  name: PropTypes.string,
  /**
   * If true, the button can not be triggered.
   */
  disabled: PropTypes.bool,
  /**
  * If true, a spinner is integrated in the button.
  */
  pending: PropTypes.bool,
  /**
   * Extend the button with any css classes separated by a space.
   */
  className: PropTypes.string,
  /**
   * If true, button will be shown as primary button. Deprecated: Use ink and look.
   */
  primary: PropTypes.bool,
  /**
   * Integrate an icon into the button. Set the specific class only from
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * React style object that gets added to the button
   */
  style: PropTypes.object,
  /**
   * HTML Button type. Default is 'button'. Possible values: button|submit|reset
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Popover title to be shown on mouse over.
   */
  title: PropTypes.string,
  /**
   * Button style according Google Material Design. Default value is 'flat'. Possible values: flat|raised
   */
  look: PropTypes.oneOf(['flat', 'raised']),
  /**
   * Define color palette. Default value is 'base'. Possible values: base|primary
   */
  ink: PropTypes.oneOf(['base', 'primary']),
  /**
   * If true, compress button to occupy less space.
   */
  dense: PropTypes.bool
}

export default Button
