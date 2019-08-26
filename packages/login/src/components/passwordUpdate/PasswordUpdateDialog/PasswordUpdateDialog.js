import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Button, LoadMask, SignalList, Typography} from 'tocco-ui'

import PasswordInput from './PasswordInput'
import StyledPasswordUpdateDialog from './StyledPasswordUpdateDialog'
import ValidationRules from '../ValidationRules'
import FailureMessage from '../FailureMessage'

class PasswordUpdateDialog extends Component {
  constructor(props) {
    super(props)
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
      return <LoadMask/>
    }

    const oldPasswordReadOnly = password.passwordUpdatePending
    const newPasswordReadOnly = (!password.oldPassword && this.props.showOldPasswordField)
      || password.passwordUpdatePending
    const newPasswordRepeatReadOnly = !password.newPassword
      || password.passwordUpdatePending
      || (password.newPasswordValidationErrors && Object.keys(password.newPasswordValidationErrors).length > 0)

    return (
      <StyledPasswordUpdateDialog>
        {this.props.showTitle
          && <Typography.H5><FormattedMessage id="client.login.passwordUpdate.title"/></Typography.H5>}
        {this.props.forcedUpdate
          && <Typography.P><FormattedMessage id="client.login.passwordUpdate.introduction"/></Typography.P>}
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.props.showOldPasswordField === true
          && <PasswordInput
            label={this.msg('client.login.passwordUpdate.oldPassword')}
            name="oldPassword"
            value={password.oldPassword}
            onChange={updateOldPassword}
            readOnly={oldPasswordReadOnly}
            autoFocus
            valid={
              password.passwordUpdateFailed && password.passwordUpdateErrorCode === 'INVALID_CREDENTIALS' ? false : null
            }
          />}
          <PasswordInput
            label={this.msg('client.login.passwordUpdate.newPassword')}
            name="newPassword"
            value={password.newPassword}
            onChange={updateNewPassword}
            readOnly={newPasswordReadOnly}
            autoFocus={this.props.showOldPasswordField !== true}
            valid={!newPasswordRepeatReadOnly}
          />
          <ValidationRules
            rules={validationRules}
            errors={password.newPasswordValidationErrors}
            rulesNeutral={!password.newPassword}
          />
          <PasswordInput
            label={this.msg('client.login.passwordUpdate.newPasswordRepeat')}
            name="newPasswordRepeat"
            value={password.newPasswordRepeat}
            onChange={updateNewPasswordRepeat}
            readOnly={newPasswordRepeatReadOnly}
            valid={this.isSubmittable()}
          />

          {
            password.newPasswordRepeat
            && password.newPassword !== password.newPasswordRepeat
            && <SignalList.List>
              <SignalList.Item condition="danger" label={<FormattedMessage id="client.login.passwordUpdate.noMatch"/>}/>
            </SignalList.List>
          }

          {password.passwordUpdateFailed === true && <FailureMessage errorCode={password.passwordUpdateErrorCode}/>}
          <Button
            pending={password.passwordUpdatePending}
            disabled={this.isSubmittable() === false}
            ink="primary"
            label={this.msg('client.login.passwordUpdate.saveButton')}
            look="raised"
            type="submit"
          />
        </form>
      </StyledPasswordUpdateDialog>
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
  password: PropTypes.shape({
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    newPasswordRepeat: PropTypes.string.isRequired,
    newPasswordValidationErrors: PropTypes.object,
    passwordUpdatePending: PropTypes.bool.isRequired,
    passwordUpdateErrorCode: PropTypes.string,
    passwordUpdateFailed: PropTypes.bool
  }).isRequired,
  validationRules: PropTypes.array,
  showOldPasswordField: PropTypes.bool,
  updateOldPassword: PropTypes.func.isRequired,
  updateNewPassword: PropTypes.func.isRequired,
  updateNewPasswordRepeat: PropTypes.func.isRequired,
  fetchValidationRules: PropTypes.func.isRequired,
  savePassword: PropTypes.func.isRequired,
  initialized: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  showTitle: PropTypes.bool,
  forcedUpdate: PropTypes.bool
}

export default PasswordUpdateDialog
