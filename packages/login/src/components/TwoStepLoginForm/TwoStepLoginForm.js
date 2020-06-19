import PropTypes from 'prop-types'
import React, {useState, useLayoutEffect, useRef} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {
  StatedValue,
  Typography
} from 'tocco-ui'

import {
  StyledTwoStepLogin
} from './StyledTwoStepLoginForm'
import {StyledLoginButton, StyledLoginFormInputWrapper, StyledLoginFormInput} from '../StyledLoginForm'

const TwoStepLoginForm = ({username, password, showTitle, loginPending, twoStepLogin, intl}) => {
  const [userCode, setUserCode] = useState(null)
  const formEl = useRef()

  useLayoutEffect(() => {
    const firstInput = formEl.current.querySelector('input')
    firstInput.focus()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    twoStepLogin(username, password, userCode)
  }

  const msg = id => intl.formatMessage({id})

  return <StyledTwoStepLogin>
    {showTitle && <Typography.H5><FormattedMessage id="client.login.form.title"/></Typography.H5>}
    <form onSubmit={handleSubmit} ref={formEl}>
      <Typography.P><FormattedMessage id="client.login.twoStepLogin.introduction"/></Typography.P>
      <StatedValue
        hasValue={!!userCode}
        id="twoFactorCode-label"
        label={msg('client.login.twoStepLogin.codePlaceholder')}
      >
        <StyledLoginFormInputWrapper>
          <StyledLoginFormInput
            type="number"
            value={userCode}
            events={{onChange: setUserCode}}
            options={{format: '### ###'}}
          />
        </StyledLoginFormInputWrapper>
      </StatedValue>
      <StyledLoginButton
        disabled={!userCode || userCode.toString().length < 6 || loginPending}
        ink="primary"
        label={msg('client.login.form.button')}
        look="raised"
        name="submit"
        pending={loginPending}
        type="submit"
      />
    </form>
  </StyledTwoStepLogin>
}

TwoStepLoginForm.propTypes = {
  intl: intlShape.isRequired,
  twoStepLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  loginPending: PropTypes.bool
}

export default TwoStepLoginForm
