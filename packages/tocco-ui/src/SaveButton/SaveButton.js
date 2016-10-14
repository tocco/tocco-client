import React from 'react'
import classNames from 'classnames'

/**
 * Styled SaveButton that triggers a function on click
 */
const SaveButton = props => {
  return (
    <button
      onClick={props.onClick}
      className={classNames('btn', 'btn-primary', props.className)}
      disabled={props.disabled}
    >
      <i
        className={classNames('fa', 'fa-floppy-o')}
        aria-hidden='true'
      ></i> {props.label}
    </button>)
}

SaveButton.propTypes = {
  /**
   * Will be displayed on button
   */
  label: React.PropTypes.string.isRequired,
  /**
   * Function that will be triggered on click event
   */
  onClick: React.PropTypes.func.isRequired,
  /**
   * If true, the button will be disabled
   */
  disabled: React.PropTypes.bool,
  /**
   * Extend the button with any css classes separated by a space
   */
  className: React.PropTypes.string
}

export default SaveButton
