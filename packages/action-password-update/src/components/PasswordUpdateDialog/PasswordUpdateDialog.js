import React, {Component} from 'react'
import {intlShape} from 'react-intl'
import {SaveButton, LoadMask} from 'tocco-ui'
import PasswordInput from './PasswordInput'
import PasswordMatchDisplay from './PasswordMatchDisplay'
import ValidationRules from '../ValidationRules'
import FailureMessage from '../FailureMessage'
import './PasswordUpdateDialog.scss'

class PasswordUpdateDialog extends Component {

  componentWillMount() {
    this.props.fetchValidationRules()
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.isSubmittable() === true) {
      this.props.savePassword()
    }
  }

  componentDidUpdate() {
    if (this.props.validationRules) {
      window.requestAnimationFrame(() => {
        this.props.initialized()
      })
    }
  }

  render() {
    const {password, validationRules, updateOldPassword, updateNewPassword, updateNewPasswordRepeat}
      = this.props

    if (!validationRules) {
      return <LoadMask className="PasswordUpdateDialog"/>
    }

    const oldPasswordReadOnly = password.passwordUpdatePending
    const newPasswordReadOnly = (!password.oldPassword && this.props.showOldPasswordField)
      || password.passwordUpdatePending
    const newPasswordRepeatReadOnly = !password.newPassword
      || password.passwordUpdatePending
      || password.newPasswordValidationErrors && Object.keys(password.newPasswordValidationErrors).length > 0

    return (
      <form className="PasswordUpdateDialog" onSubmit={this.handleSubmit.bind(this)}>
        {this.props.showOldPasswordField === true
        && <PasswordInput
          label={this.msg('client.action.passwordUpdate.oldPassword')}
          name="oldPassword"
          value={password.oldPassword}
          onChange={updateOldPassword}
          readOnly={oldPasswordReadOnly}
          autoFocus
        />}
        <PasswordInput
          label={this.msg('client.action.passwordUpdate.newPassword')}
          name="newPassword"
          value={password.newPassword}
          onChange={updateNewPassword}
          readOnly={newPasswordReadOnly}
          autoFocus={this.props.showOldPasswordField !== true}
        />
        <ValidationRules
          rules={validationRules}
          errors={password.newPasswordValidationErrors}
        />
        <PasswordInput
          label={this.msg('client.action.passwordUpdate.newPasswordRepeat')}
          name="newPasswordRepeat"
          value={password.newPasswordRepeat}
          onChange={updateNewPasswordRepeat}
          readOnly={newPasswordRepeatReadOnly}
        />
        <PasswordMatchDisplay password={password.newPassword} passwordRepeat={password.newPasswordRepeat}/>
        <SaveButton
          label={this.msg('client.action.passwordUpdate.saveButton')}
          disabled={this.isSubmittable() === false}
          className={password.passwordUpdatePending ? 'update-pending' : ''}
        />
        {password.passwordUpdateFailed === true && <FailureMessage errorCode={password.passwordUpdateErrorCode}/>}
      </form>
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

  msg(id) {
    return this.props.intl.formatMessage({
      id
    })
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
  validationRules: React.PropTypes.array,
  showOldPasswordField: React.PropTypes.bool,
  updateOldPassword: React.PropTypes.func.isRequired,
  updateNewPassword: React.PropTypes.func.isRequired,
  updateNewPasswordRepeat: React.PropTypes.func.isRequired,
  fetchValidationRules: React.PropTypes.func.isRequired,
  savePassword: React.PropTypes.func.isRequired,
  initialized: React.PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default PasswordUpdateDialog
