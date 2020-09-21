import PropTypes from 'prop-types'
import React, {useRef, useEffect} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {LoadMask, SignalList, Typography} from 'tocco-ui'
import styled from 'styled-components'
import ReCAPTCHA from 'react-google-recaptcha'

import PasswordInput from './PasswordInput'
import StyledPasswordUpdateDialog from './StyledPasswordUpdateDialog'
import ValidationRules from '../ValidationRules'
import FailureMessage from '../FailureMessage'
import {StyledLoginButton} from '../../StyledLoginForm'

const StyledValidationRulesWrapper = styled.div`
  margin: 1rem;
`

const PasswordUpdateDialog = ({
  captchaKey,
  fetchValidationRules,
  forcedUpdate,
  initialized,
  intl,
  password,
  savePassword,
  showOldPasswordField,
  showTitle,
  updateNewPassword,
  updateNewPasswordRepeat,
  updateOldPassword,
  validationRules
}) => {
  const recaptchaRef = useRef()

  useEffect(() => {
    fetchValidationRules()
  }, [])

  useEffect(() => {
    if (validationRules) {
      initialized()
    }
  }, [validationRules])

  const handleSubmit = async e => {
    e.preventDefault()

    if (isSubmittable() === true) {
      const recaptchaToken = await recaptchaRef.current.executeAsync()
      recaptchaRef.current.reset()
      savePassword(recaptchaToken)
    }
  }

  const isSubmittable = () => {
    if (!password.newPasswordRepeat) {
      return false
    }
    if (password.newPassword !== password.newPasswordRepeat) {
      return false
    }
    if (password.passwordUpdatePending) {
      return false
    }
    return true
  }

  const msg = id => intl.formatMessage({id})

  if (!validationRules) {
    return <LoadMask/>
  }

  const oldPasswordReadOnly = password.passwordUpdatePending
  const newPasswordReadOnly = (!password.oldPassword && showOldPasswordField)
    || password.passwordUpdatePending
  const newPasswordRepeatReadOnly = !password.newPassword
    || password.passwordUpdatePending
    || (password.newPasswordValidationErrors && Object.keys(password.newPasswordValidationErrors).length > 0)

  return <StyledPasswordUpdateDialog>
    {showTitle
      && <Typography.H5><FormattedMessage id="client.login.passwordUpdate.title"/></Typography.H5>}
    {forcedUpdate
      && <Typography.P><FormattedMessage id="client.login.passwordUpdate.introduction"/></Typography.P>}
    <form onSubmit={handleSubmit}>
      {showOldPasswordField === true
        && <PasswordInput
          tabIndex={1}
          label={msg('client.login.passwordUpdate.oldPassword')}
          name="oldPassword"
          value={password.oldPassword}
          onChange={updateOldPassword}
          readOnly={oldPasswordReadOnly}
          autoFocus
          {...(password.passwordUpdateFailed && password.passwordUpdateErrorCode === 'INVALID_CREDENTIALS'
            && {valid: false})
          }
        />}
      <PasswordInput
        tabIndex={2}
        label={msg('client.login.passwordUpdate.newPassword')}
        name="newPassword"
        value={password.newPassword}
        onChange={updateNewPassword}
        readOnly={newPasswordReadOnly}
        autoFocus={showOldPasswordField !== true}
        valid={!newPasswordRepeatReadOnly}
      />
      <StyledValidationRulesWrapper>
        <ValidationRules
          rules={validationRules}
          errors={password.newPasswordValidationErrors}
          rulesNeutral={!password.newPassword}
        />
      </StyledValidationRulesWrapper>
      <PasswordInput
        tabIndex={3}
        label={msg('client.login.passwordUpdate.newPasswordRepeat')}
        name="newPasswordRepeat"
        value={password.newPasswordRepeat}
        onChange={updateNewPasswordRepeat}
        readOnly={newPasswordRepeatReadOnly}
        valid={isSubmittable()}
      />

      {
        password.newPasswordRepeat
          && password.newPassword !== password.newPasswordRepeat
          && <SignalList.List>
            <SignalList.Item condition="danger" label={<FormattedMessage id="client.login.passwordUpdate.noMatch"/>}/>
          </SignalList.List>
      }

      {password.passwordUpdateFailed === true && <FailureMessage errorCode={password.passwordUpdateErrorCode}/>}
      <StyledLoginButton
        pending={password.passwordUpdatePending}
        disabled={isSubmittable() === false}
        ink="primary"
        label={msg('client.login.passwordUpdate.saveButton')}
        look="raised"
        type="submit"
      />
      {captchaKey && <ReCAPTCHA
        ref={recaptchaRef}
        badge="bottomright"
        size="invisible"
        sitekey={captchaKey}
        hl={intl.locale}
      />}
    </form>
  </StyledPasswordUpdateDialog>
}

PasswordUpdateDialog.propTypes = {
  captchaKey: PropTypes.string,
  fetchValidationRules: PropTypes.func.isRequired,
  forcedUpdate: PropTypes.bool,
  initialized: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  password: PropTypes.shape({
    newPassword: PropTypes.string.isRequired,
    newPasswordRepeat: PropTypes.string.isRequired,
    newPasswordValidationErrors: PropTypes.object,
    oldPassword: PropTypes.string.isRequired,
    passwordUpdateErrorCode: PropTypes.string,
    passwordUpdateFailed: PropTypes.bool,
    passwordUpdatePending: PropTypes.bool.isRequired
  }).isRequired,
  savePassword: PropTypes.func.isRequired,
  showOldPasswordField: PropTypes.bool,
  showTitle: PropTypes.bool,
  updateNewPassword: PropTypes.func.isRequired,
  updateNewPasswordRepeat: PropTypes.func.isRequired,
  updateOldPassword: PropTypes.func.isRequired,
  validationRules: PropTypes.array
}

export default PasswordUpdateDialog
