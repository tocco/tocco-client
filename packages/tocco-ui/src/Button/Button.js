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
      'btn-default': !props.primary,
      'btn-primary': props.primary
    }
  )

  const getIconClass = (icon, pending) => {
    if (pending) {
      return 'fa fa-circle-o-notch fa-spin'
    }
    return icon ? classNames({
      'glyphicon': icon.startsWith('glyphicon-'),
      'fa': icon.startsWith('fa-')
    },
    icon)
      : ''
  }

  return (
    <button
      name={props.name}
      title={props.title}
      onClick={props.onClick}
      className={classes}
      disabled={props.disabled}
      type={props.type ? props.type : 'button'}
      style={props.style}
    >
      <i className={getIconClass(props.icon, props.pending)}/> {props.label || ''}
    </button>)
}

Button.propTypes = {
  /**
   * Will be displayed on button, default is an empty string
   */
  label: PropTypes.node,
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
   * React style object that gets added to the button
   *
   */
  style: PropTypes.object,
  /**
   * HTML Button type. Default is 'button'. Possible values: button|submit|reset
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Popover title to be shown on mouse over.
   */
  title: PropTypes.string
}

export default Button
