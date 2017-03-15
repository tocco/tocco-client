import React from 'react'
import classNames from 'classnames'

/**
 * Styled Button
 */
const Button = props => {
  const classes = classNames(
    'btn',
    'btn-default',
    props.className,
    {
      'pending': props.pending,
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
      <i className={classNames('glyphicon', props.icon)}/> {props.label || ''}
    </button>)
}

Button.propTypes = {
  /**
   * Will be displayed on button, default is an empty string
   */
  label: React.PropTypes.string,
  /**
   * Function that will be triggered on click event
   */
  onClick: React.PropTypes.func,
  /**
   * Set the name of the button
   */
  name: React.PropTypes.string,
  /**
   * If true, the button will be disabled
   */
  disabled: React.PropTypes.bool,
 /**
  * If true, a spinner will be shown on the button
  */
  pending: React.PropTypes.bool,
  /**
   * Extend the button with any css classes separated by a space
   */
  className: React.PropTypes.string,
  /**
   * If true, button will be shown as primary button
   */
  primary: React.PropTypes.bool,
  /**
   * Add an icon to the button. Possible icons are defined here: http://glyphicons.bootstrapcheatsheets.com/
   */
  icon: React.PropTypes.string,
  /**
   * HTML Button type. Default is 'button'. Possible values: button|submit|reset
   */
  type: React.PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button
