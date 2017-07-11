import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Pages} from '../../types/Pages'
import {Button} from 'tocco-ui'

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
          <div className="message-box">
            {
              this.props.message && this.props.message.text
            && <span className={this.props.message.negative ? 'text-danger' : ''}>{this.props.message.text}</span>
            }
          </div>
          <div>
            <div>
              <Button
                label={this.msg('client.login.form.button')}
                type="submit"
                disabled={this.props.loginPending || this.props.username === '' || this.props.password === ''}
                pending={this.props.loginPending}
                icon="glyphicon-log-in"
                primary
              />
              <div>
                <a
                  className="forgot-password"
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
