import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

/**
 * Styled Button
 */
const Button = props => {
  const classes = classNames(
    'btn',
    props.className,
    {
      'pending': props.pending,
      'btn-default': !props.primary,
      'btn-primary': props.primary
    }
  )

  return (
    <button
      name={props.name}
      onClick={props.onClick}
      className={classes}
      disabled={props.disabled}
      type={props.type ? props.type : 'button'}
    >
      {props.icon
      && <i className={classNames('glyphicon', props.icon)}/>} {props.label || ''}
    </button>)
}

Button.propTypes = {
  /**
   * Will be displayed on button, default is an empty string
   */
  label: PropTypes.string,
  /**
   * Function that will be triggered on click event
   */
  onClick: PropTypes.func,
  /**
   * Set the name of the button
   */
  name: PropTypes.string,
  /**
   * If true, the button will be disabled
   */
  disabled: PropTypes.bool,
  /**
  * If true, a spinner will be shown on the button
  */
  pending: PropTypes.bool,
  /**
   * Extend the button with any css classes separated by a space
   */
  className: PropTypes.string,
  /**
   * If true, button will be shown as primary button
   */
  primary: PropTypes.bool,
  /**
   * Add an icon to the button. Possible icons are defined here: http://glyphicons.bootstrapcheatsheets.com/
   */
  icon: PropTypes.string,
  /**
   * HTML Button type. Default is 'button'. Possible values: button|submit|reset
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button
