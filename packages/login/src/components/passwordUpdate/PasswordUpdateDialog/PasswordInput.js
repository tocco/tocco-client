import React from 'react'
import classNames from 'classnames'

const PasswordInput = props => (
  <div className={classNames('form-group', props.name, props.formGroupStateClass)}>
    <label className="font-bold" htmlFor={props.name + 'Input'}>{props.label}</label>
    <input
      type="password"
      className="form-control"
      id={props.name + 'Input'}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      readOnly={props.readOnly === true}
      onKeyDown={props.onKeyDown}
      autoFocus={props.autoFocus}
    />
  </div>
)

PasswordInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  readOnly: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func,
  autoFocus: React.PropTypes.bool,
  formGroupStateClass: React.PropTypes.string
}

export default PasswordInput
