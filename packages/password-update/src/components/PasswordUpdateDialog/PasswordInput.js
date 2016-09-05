import React, { Component } from 'react'

const PasswordInput = (props) => (
  <div className={"form-group " + props.name}>
    <label htmlFor={props.name + "Input"}>{props.label}</label>
    <input
      type="password"
      className="form-control"
      id={props.name + "Input"}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      readOnly={props.readOnly === true}
    />
  </div>
)

PasswordInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  readOnly: React.PropTypes.bool
}

export default PasswordInput
