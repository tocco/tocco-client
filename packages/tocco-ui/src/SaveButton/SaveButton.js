import React from 'react'
import classNames from 'classnames'

const SaveButton = props => {
  return (
    <button
      onClick={props.onClick}
      className={classNames('btn', 'btn-primary', props.className)}
      disabled={props.disabled}
    >
      <i className="glyphicon glyphicon-floppy-save"/> {props.label}
    </button>)
}

SaveButton.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string
}

export default SaveButton
