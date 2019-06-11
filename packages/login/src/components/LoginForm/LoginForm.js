import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {
  Button,
  ButtonGroup,
  SignalList,
  StatedValue,
  Typography
} from 'tocco-ui'

import {
  StyledLoginFormInput,
  StyledLoginFormInputWrapper,
  StyledLoginFormWrapper
} from '../StyledLoginForm'
import {Pages} from '../../types/Pages'

export class LoginForm extends Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.props.username, this.props.password)
  }

  handleUsernameChange(e) {
    this.props.setUsername(e.target.value)
  }

  handlePasswordChange(e) {
    this.props.setPassword(e.target.value)
  }

  render() {
    const passwordFocus = !!this.props.username
    const usernameFocus = !passwordFocus

    return (
      <StyledLoginFormWrapper>
        {this.props.showTitle
          && <React.Fragment>
            <Typography.H5><FormattedMessage id="client.login.form.title"/></Typography.H5>
            <Typography.P><FormattedMessage id="client.login.form.introduction"/></Typography.P>
          </React.Fragment>}
        <form onSubmit={this.handleSubmit.bind(this)}>

          <StatedValue
            hasValue={!!this.props.username && this.props.username.length > 0}
            id="login-username"
            label={this.msg('client.login.form.userPlaceholder')}
            mandatory
          >
            <StyledLoginFormInputWrapper>
              <StyledLoginFormInput
                autoFocus={usernameFocus}
                name="user"
                onChange={this.handleUsernameChange.bind(this)}
                required
                type="text"
                value={this.props.username}
              />
            </StyledLoginFormInputWrapper>
          </StatedValue>

          <StatedValue
            hasValue={!!this.props.password && this.props.password.length > 0}
            id="login-password"
            label={this.msg('client.login.form.passwordPlaceholder')}
            mandatory
          >
            <StyledLoginFormInputWrapper>
              <StyledLoginFormInput
                autoFocus={passwordFocus}
                name="password"
                onChange={this.handlePasswordChange.bind(this)}
                required
                type="password"
                value={this.props.password}
              />
            </StyledLoginFormInputWrapper>
          </StatedValue>

          {
            this.props.message && this.props.message.text
            && <SignalList.List>
              <SignalList.Item
                condition={this.props.message.negative ? 'danger' : 'base'}
                label={this.props.message.text}
              />
            </SignalList.List>
          }

          <ButtonGroup look="raised">
            <Button
              disabled={this.props.loginPending || this.props.username === '' || this.props.password === ''}
              ink="primary"
              label={this.msg('client.login.form.button')}
              pending={this.props.loginPending}
              type="submit"
            />
            <Button
              label={this.msg('client.login.form.forgotLink')}
              onClick={() => this.props.changePage(Pages.PASSWORD_REQUEST)}
            />
          </ButtonGroup>
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

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  login: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  loginPending: PropTypes.bool.isRequired,
  setPassword: PropTypes.func.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string,
    negative: PropTypes.bool
  }),
  showTitle: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string
}
