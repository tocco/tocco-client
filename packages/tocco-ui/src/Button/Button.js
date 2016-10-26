import React from 'react'
import classNames from 'classnames'
import './styles.scss'

/**
 * Styled Button
 */
const Button = props => {
  return (
    <button
      name={props.name}
      onClick={props.onClick}
      className={classNames('btn', 'btn-primary', props.className, props.pending ? 'pending' : '')}
      disabled={props.disabled}
      type={props.type ? props.type : 'button'}
    >
      <i className={classNames('glyphicon', props.icon)}/> {props.label}
    </button>)
}

Button.propTypes = {
  /**
   * Will be displayed on button
   */
  label: React.PropTypes.string.isRequired,
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
   * Add an icon to the button. Possible icons are defined here: http://glyphicons.bootstrapcheatsheets.com/
   */
  icon: React.PropTypes.string,
  /**
   * HTML Button type. Default is 'button'. Possible values: button|submit|reset
   */
  type: React.PropTypes.string
}

export default Button
