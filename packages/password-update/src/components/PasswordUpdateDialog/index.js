import React, { Component } from 'react'
import ValidationRules from '../ValidationRules'

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

class PasswordUpdateDialog extends Component {

  render() {
    const { password, validationRules, updateOldPassword, updateNewPassword, updateNewPasswordRepeat } = this.props

    return (
      <div className="PasswordUpdateDialog">
        <PasswordInput
          label="Altes Passwort"
          name="oldPassword"
          value={password.oldPassword}
          onChange={updateOldPassword}
        />
        <PasswordInput
          label="Neues Passwort"
          name="newPassword"
          value={password.newPassword}
          onChange={updateNewPassword}
          readOnly={!password.oldPassword}
        />
        <ValidationRules
          rules={validationRules}
          errors={password.newPasswordValidationErrors}
        />
        <PasswordInput
          label="Neues Passwort bestätigen"
          name="newPasswordRepeat"
          value={password.newPasswordRepeat}
          onChange={updateNewPasswordRepeat}
          readOnly={!password.newPassword || Object.keys(password.newPasswordValidationErrors).length > 0}
        />
      </div>
    )
  }
}

PasswordUpdateDialog.propTypes = {
  password: React.PropTypes.shape({
    oldPassword: React.PropTypes.string.isRequired,
    newPassword: React.PropTypes.string.isRequired,
    newPasswordRepeat: React.PropTypes.string.isRequired,
    newPasswordValidationErrors: React.PropTypes.object
  }).isRequired,
  validationRules: React.PropTypes.array.isRequired,
  updateOldPassword: React.PropTypes.func.isRequired,
  updateNewPassword: React.PropTypes.func.isRequired,
  updateNewPasswordRepeat: React.PropTypes.func.isRequired
}

export default PasswordUpdateDialog
