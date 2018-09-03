import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Button, ButtonGroup} from 'tocco-ui'
import {H5, P} from 'tocco-ui/src/Typography'
import SignalList, {SignalListItem} from 'tocco-ui/src/SignalList'

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
    return (
      <div className="login-form">
        {
          this.props.showTitle
          && <div>
            <H5><FormattedMessage id="client.login.form.title"/></H5>
            <P><FormattedMessage id="client.login.form.introduction"/></P>
          </div>
        }
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group dense">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
              <input
                type="text"
                className="form-control"
                name="user"
                onChange={this.handleUsernameChange.bind(this)}
                placeholder={this.msg('client.login.form.userPlaceholder')}
                value={this.props.username}
                required
                autoFocus
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.handlePasswordChange.bind(this)}
                placeholder={this.msg('client.login.form.passwordPlaceholder')}
                required
              />
            </div>
          </div>

          {
            this.props.message && this.props.message.text
            && <SignalList>
              <SignalListItem
                condition={this.props.message.negative ? 'danger' : 'base'}
                label={this.props.message.text}
              />
            </SignalList>
          }

          <div>
            <div>
              <ButtonGroup look="raised">
                <Button
                  disabled={this.props.loginPending || this.props.username === '' || this.props.password === ''}
                  ink="primary"
                  label={this.msg('client.login.form.button')}
                  pending={this.props.loginPending}
                  type="submit"
                />
                <Button
                  className="forgot-password"
                  label={this.msg('client.login.form.forgotLink')}
                  onClick={() => this.props.changePage(Pages.PASSWORD_REQUEST)}
                />
              </ButtonGroup>
            </div>
          </div>
        </form>
      </div>
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
