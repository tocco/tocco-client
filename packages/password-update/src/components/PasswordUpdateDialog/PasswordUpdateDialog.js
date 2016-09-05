import React, { Component } from 'react'
import PasswordInput from './PasswordInput'
import ValidationRules from '../ValidationRules'

class PasswordUpdateDialog extends Component {

  componentWillMount() {
    this.props.fetchValidationRules();
  }

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
  updateNewPasswordRepeat: React.PropTypes.func.isRequired,
  fetchValidationRules: React.PropTypes.func.isRequired
}

export default PasswordUpdateDialog
