import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Pages} from '../../types/Pages'
import * as ToccoUI from 'tocco-ui'

import '../Login/styles.scss'

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
            <h1><FormattedMessage id="client.login.form.title"/></h1>
            <p><FormattedMessage id="client.login.form.introduction"/></p>
          </div>
        }
        <form>
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
            />
          </div>
          <div className="input-group m-t-5">
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
          <div className="message-box">
            {
            this.props.message && this.props.message.text
            && <span className={this.props.message.negative ? 'negative' : ''}>{this.props.message.text}</span>
          }
          </div>
          <div>
            <div>
              <ToccoUI.Button
                label={this.msg('client.login.form.button')}
                onClick={this.handleSubmit.bind(this)}
                disabled={this.props.loginPending || this.props.username === '' || this.props.password === ''}
                pending={this.props.loginPending}
                icon="glyphicon-log-in"
              />
              <div>
                <a
                  className="forgot-password pointer"
                  onClick={() => this.props.changePage(Pages.PASSWORD_REQUEST)}
                >
                  <FormattedMessage id="client.login.form.forgotLink"/>
                </a>
              </div>
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
  login: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  loginPending: React.PropTypes.bool.isRequired,
  setPassword: React.PropTypes.func.isRequired,
  message: React.PropTypes.shape({
    text: React.PropTypes.string,
    negative: React.PropTypes.bool
  }),
  showTitle: React.PropTypes.bool,
  username: React.PropTypes.string,
  password: React.PropTypes.string
}
