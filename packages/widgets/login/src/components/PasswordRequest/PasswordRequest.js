import PropTypes from 'prop-types'
import {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {StatedValue, Typography} from 'tocco-ui'

import {Pages} from '../../types/Pages'
import {
  StyledLoginFormInput,
  StyledLoginFormInputWrapper,
  StyledLoginFormWrapper,
  StyledTransparentButton,
  StyledLoginButton
} from '../StyledLoginForm'

export const PasswordRequest = ({username, requestPassword, intl, showTitle, pending, changePage}) => {
  const [userName, setUserName] = useState(username || '')

  const handleSubmit = e => {
    e.preventDefault()
    requestPassword(userName)
  }

  const handleUsernameChange = e => {
    setUserName(e.target.value)
  }

  const msg = id => intl.formatMessage({id})

  return (
    <StyledLoginFormWrapper>
      {showTitle && (
        <Typography.H5>
          <FormattedMessage id="client.login.passwordRequest.title" />
        </Typography.H5>
      )}
      <Typography.P>
        <FormattedMessage id="client.login.passwordRequest.introduction" />
      </Typography.P>
      <form onSubmit={handleSubmit}>
        <StatedValue hasValue={Boolean(userName)} id="login-username" label={msg('client.login.form.userPlaceholder')}>
          <StyledLoginFormInputWrapper>
            <StyledLoginFormInput
              name="user"
              onChange={handleUsernameChange}
              required
              type="text"
              value={userName}
              data-cy="password-request_input"
            />
          </StyledLoginFormInputWrapper>
        </StatedValue>

        <StyledLoginButton
          look="raised"
          disabled={!userName || pending}
          ink="primary"
          label={msg('client.login.passwordRequest.button')}
          pending={pending}
          type="submit"
          data-cy="password-request_submit-button"
        />
        <StyledTransparentButton
          disabled={pending}
          label={msg('client.login.passwordRequest.abortButton')}
          name="abort"
          onClick={() => changePage(Pages.LOGIN_FORM)}
          data-cy="password-request_abort-button"
        />
      </form>
    </StyledLoginFormWrapper>
  )
}

PasswordRequest.propTypes = {
  intl: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  requestPassword: PropTypes.func.isRequired,
  showTitle: PropTypes.bool,
  pending: PropTypes.bool,
  username: PropTypes.string
}
