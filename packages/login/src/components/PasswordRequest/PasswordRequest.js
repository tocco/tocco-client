import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {
  StatedValue,
  Typography
} from 'tocco-ui'

import {
  StyledLoginFormInput,
  StyledLoginFormInputWrapper,
  StyledLoginFormWrapper,
  StyledTransparentButton,
  StyledLoginButton
} from '../StyledLoginForm'
import {Pages} from '../../types/Pages'

export class PasswordRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username || ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.requestPassword(this.state.username)
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <StyledLoginFormWrapper>
        {this.props.showTitle
          && <Typography.H5><FormattedMessage id="client.login.passwordRequest.title"/></Typography.H5>}
        <Typography.P><FormattedMessage id="client.login.passwordRequest.introduction"/></Typography.P>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <StatedValue
            hasValue={!!this.state.username}
            id="login-username"
            label={this.msg('client.login.form.userPlaceholder')}
          >
            <StyledLoginFormInputWrapper>
              <StyledLoginFormInput
                name="user"
                onChange={this.handleUsernameChange.bind(this)}
                required
                type="text"
                value={this.state.username}
                data-cy="password-request_input"
              />
            </StyledLoginFormInputWrapper>
          </StatedValue>

          <StyledLoginButton
            look="raised"
            disabled={!this.state.username || this.props.pending}
            ink="primary"
            label={this.msg('client.login.passwordRequest.button')}
            pending={this.props.pending}
            type="submit"
            data-cy="password-request_submit-button"
          />
          <StyledTransparentButton
            disabled={this.props.pending}
            label={this.msg('client.login.passwordRequest.abortButton')}
            name="abort"
            onClick={() => this.props.changePage(Pages.LOGIN_FORM)}
            data-cy="password-request_abort-button"
          />
        </form>
      </StyledLoginFormWrapper>
    )
  }

  msg(id) {
    return this.props.intl.formatMessage({
      id
    })
  }
}

PasswordRequest.propTypes = {
  intl: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  requestPassword: PropTypes.func.isRequired,
  showTitle: PropTypes.bool,
  pending: PropTypes.bool,
  username: PropTypes.string
}
