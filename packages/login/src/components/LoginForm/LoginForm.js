import PropTypes from 'prop-types'
import React, {useEffect, useState, useRef} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {
  SignalList,
  StatedValue,
  Typography
} from 'tocco-ui'
import ReCAPTCHA from 'react-google-recaptcha'

import {
  StyledLoginFormInput,
  StyledLoginFormInputWrapper,
  StyledLoginFormWrapper,
  StyledTransparentButton,
  StyledLoginButton
} from '../StyledLoginForm'
import {Pages} from '../../types/Pages'

const LoginForm = ({
  captchaKey,
  changePage,
  intl,
  login,
  loginPending,
  message,
  password,
  recaptchaActivated,
  setPassword,
  setUsername,
  showTitle,
  username
}) => {
  const [autoFill, setAutoFill] = useState(false)
  const recaptchaRef = useRef()

  const msg = id => intl.formatMessage({id})

  useEffect(() => {
    if (recaptchaActivated) {
      handleSubmit()
    }
  }, [recaptchaActivated])

  const handleSubmit = async e => {
    if (e) {
      e.preventDefault()
    }

    let recaptchaToken = null
    if (recaptchaActivated) {
      recaptchaToken = await recaptchaRef.current.executeAsync()
      recaptchaRef.current.reset()
    }

    login(username, password, recaptchaToken)
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
    setAutoFill(false)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
    setAutoFill(false)
  }

  const handleAutoFill = e => {
    if (e.animationName === 'onAutoFillStart') {
      setAutoFill(true)
    }
  }

  const passwordFocus = !!username
  const usernameFocus = !passwordFocus

  return <StyledLoginFormWrapper>
    {showTitle
        && <React.Fragment>
          <Typography.H5><FormattedMessage id="client.login.form.title"/></Typography.H5>
          <Typography.P><FormattedMessage id="client.login.form.introduction"/></Typography.P>
        </React.Fragment>}
    <form onSubmit={handleSubmit}>
      <StatedValue
        hasValue={!!username || autoFill}
        id="login-username"
        label={msg('client.login.form.userPlaceholder')}
      >
        <StyledLoginFormInputWrapper>
          <StyledLoginFormInput
            autoFocus={usernameFocus}
            name="user"
            data-cy="login-form_user-input"
            onChange={handleUsernameChange}
            required
            type="text"
            value={username}
            onAnimationStart={handleAutoFill}
            onFocus={e => e.target.select()}
          />
        </StyledLoginFormInputWrapper>
      </StatedValue>

      <StatedValue
        hasValue={!!password || autoFill}
        id="login-password"
        label={msg('client.login.form.passwordPlaceholder')}
      >
        <StyledLoginFormInputWrapper>
          <StyledLoginFormInput
            autoFocus={passwordFocus}
            name="password"
            data-cy="login-form_password-input"
            onChange={handlePasswordChange}
            required
            type="password"
            value={password}
            onAnimationStart={handleAutoFill}
            onFocus={e => e.target.select()}
          />
        </StyledLoginFormInputWrapper>
      </StatedValue>

      {
        message && message.text
            && <SignalList.List>
              <SignalList.Item
                condition={message.negative ? 'danger' : 'base'}
                label={message.text}
              />
            </SignalList.List>
      }
      {captchaKey && recaptchaActivated && <ReCAPTCHA
        ref={recaptchaRef}
        badge="bottomright"
        size="invisible"
        sitekey={captchaKey}
        hl={intl.locale}
      />}
      <StyledLoginButton
        disabled={!autoFill && (loginPending || username === '' || password === '')}
        ink="primary"
        look="raised"
        label={msg('client.login.form.button')}
        pending={loginPending}
        type="submit"
        data-cy="login-form_login-button"
      />
      <StyledTransparentButton
        label={msg('client.login.form.forgotLink')}
        onClick={() => changePage(Pages.PASSWORD_REQUEST)}
        data-cy="login-form_request-button"
      />
    </form>
  </StyledLoginFormWrapper>
}

LoginForm.propTypes = {
  captchaKey: PropTypes.string,
  changePage: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  login: PropTypes.func.isRequired,
  loginPending: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    negative: PropTypes.bool,
    text: PropTypes.string
  }),
  password: PropTypes.string,
  recaptchaActivated: PropTypes.bool,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  showTitle: PropTypes.bool,
  username: PropTypes.string
}

export default LoginForm
