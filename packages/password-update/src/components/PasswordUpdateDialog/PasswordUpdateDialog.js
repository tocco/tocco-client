import React, {Component} from 'react'
import {SaveButton} from 'tocco-ui'
import PasswordInput from './PasswordInput'
import PasswordMatchDisplay from './PasswordMatchDisplay'
import ValidationRules from '../ValidationRules'
import FailureMessage from '../FailureMessage'
import './PasswordUpdateDialog.scss'

class PasswordUpdateDialog extends Component {

  componentWillMount() {
    this.props.fetchValidationRules()
  }

  onPwRepeatKeyDown(e) {
    if (e.keyCode === 13 && this.isSubmittable() === true) {
      this.props.savePassword()
    }
  }

  render() {
    const {password, validationRules, updateOldPassword, updateNewPassword, updateNewPasswordRepeat, savePassword}
      = this.props

    const oldPasswordReadOnly = password.passwordUpdatePending
    const newPasswordReadOnly = (!password.oldPassword && this.props.showOldPasswordField)
      || password.passwordUpdatePending
    const newPasswordRepeatReadOnly = !password.newPassword
      || password.passwordUpdatePending
      || Object.keys(password.newPasswordValidationErrors).length > 0

    return (
      <div className="PasswordUpdateDialog">
        {this.props.showOldPasswordField === true
        && <PasswordInput
          label="Altes Passwort"
          name="oldPassword"
          value={password.oldPassword}
          onChange={updateOldPassword}
          readOnly={oldPasswordReadOnly}
        />}
        <PasswordInput
          label="Neues Passwort"
          name="newPassword"
          value={password.newPassword}
          onChange={updateNewPassword}
          readOnly={newPasswordReadOnly}
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
          readOnly={newPasswordRepeatReadOnly}
          onKeyDown={this.onPwRepeatKeyDown.bind(this)}
        />
        <PasswordMatchDisplay password={password.newPassword} passwordRepeat={password.newPasswordRepeat}/>
        <SaveButton
          label="Passwort ändern"
          disabled={this.isSubmittable() === false}
          onClick={savePassword}
          className={password.passwordUpdatePending ? 'update-pending' : ''}
        />
        {password.passwordUpdateFailed === true && <FailureMessage errorCode={password.passwordUpdateErrorCode}/>}
      </div>
    )
  }

  isSubmittable() {
    if (!this.props.password.newPasswordRepeat) {
      return false
    }
    if (this.props.password.newPassword !== this.props.password.newPasswordRepeat) {
      return false
    }
    if (this.props.password.passwordUpdatePending) {
      return false
    }
    return true
  }
}

PasswordUpdateDialog.propTypes = {
  password: React.PropTypes.shape({
    oldPassword: React.PropTypes.string.isRequired,
    newPassword: React.PropTypes.string.isRequired,
    newPasswordRepeat: React.PropTypes.string.isRequired,
    newPasswordValidationErrors: React.PropTypes.object,
    passwordUpdatePending: React.PropTypes.bool.isRequired,
    passwordUpdateErrorCode: React.PropTypes.string
  }).isRequired,
  validationRules: React.PropTypes.array.isRequired,
  showOldPasswordField: React.PropTypes.bool.isRequired,
  updateOldPassword: React.PropTypes.func.isRequired,
  updateNewPassword: React.PropTypes.func.isRequired,
  updateNewPasswordRepeat: React.PropTypes.func.isRequired,
  fetchValidationRules: React.PropTypes.func.isRequired,
  savePassword: React.PropTypes.func.isRequired
}

export default PasswordUpdateDialog
