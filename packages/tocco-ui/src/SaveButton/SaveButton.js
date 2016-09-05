import React from 'react'

const SaveButton = props => {
  return (
    <button onClick={props.onClick} className="btn btn-primary">
      <i className="glyphicon glyphicon-floppy-save"></i> {props.label}
    </button>)
}

SaveButton.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

export default SaveButton
