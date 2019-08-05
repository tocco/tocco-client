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
  state = {
    autoFill: false
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.props.username, this.props.password)
  }

  handleUsernameChange(e) {
    this.props.setUsername(e.target.value)
    this.setState({...this.state, autoFill: false})
  }

  handlePasswordChange(e) {
    this.props.setPassword(e.target.value)
    this.setState({...this.state, autoFill: false})
  }

  handleAutoFill = e => {
    if (e.animationName === 'onAutoFillStart') {
      this.setState({...this.state, autoFill: true})
    }
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
            hasValue={!!this.props.username || this.state.autoFill}
            id="login-username"
            label={this.msg('client.login.form.userPlaceholder')}
          >
            <StyledLoginFormInputWrapper>
              <StyledLoginFormInput
                autoFocus={usernameFocus}
                name="user"
                data-cy="login-form_user-input"
                onChange={this.handleUsernameChange.bind(this)}
                required
                type="text"
                value={this.props.username}
                onAnimationStart={this.handleAutoFill}
                onFocus={e => e.target.select()}
              />
            </StyledLoginFormInputWrapper>
          </StatedValue>

          <StatedValue
            hasValue={!!this.props.password || this.state.autoFill}
            id="login-password"
            label={this.msg('client.login.form.passwordPlaceholder')}
          >
            <StyledLoginFormInputWrapper>
              <StyledLoginFormInput
                autoFocus={passwordFocus}
                name="password"
                data-cy="login-form_password-input"
                onChange={this.handlePasswordChange.bind(this)}
                required
                type="password"
                value={this.props.password}
                onAnimationStart={this.handleAutoFill}
                onFocus={e => e.target.select()}
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
              disabled={
                !this.state.autoFill
                && (this.props.loginPending || this.props.username === '' || this.props.password === '')}
              ink="primary"
              label={this.msg('client.login.form.button')}
              pending={this.props.loginPending}
              type="submit"
              data-cy="login-form_login-button"
            />
            <Button
              label={this.msg('client.login.form.forgotLink')}
              onClick={() => this.props.changePage(Pages.PASSWORD_REQUEST)}
              data-cy="login-form_request-button"
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
