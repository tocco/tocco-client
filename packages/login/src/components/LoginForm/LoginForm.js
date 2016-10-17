import React, {Component} from 'react'
import '../Login/styles.scss'
import {Pages} from '../../types/Pages'

export class LoginForm extends Component {

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.props.username, this.props.password)
  }

  handleUsername(e) {
    this.props.setUsername(e.target.value)
  }

  handlePassword(e) {
    this.props.setPassword(e.target.value)
  }

  render() {
    return (
      <div className="login-form">
        {
          this.props.showTitle
          && <div>
            <h1>Login</h1>
            <p>Dieser Bereich ist privat. Bitte melden Sie sich an.</p>
          </div>
        }
        <form>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
            <input
              id="user"
              type="text"
              className="form-control"
              name="user"
              onChange={this.handleUsername.bind(this)}
              placeholder="Benutzername / E-Mail"
              value={this.props.username}
              required
            />
          </div>
          <div className="input-group m-t-5">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              onChange={this.handlePassword.bind(this)}
              placeholder="Passwort"
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
              <button
                className={'btn btn-primary m-t-5 ' + (this.props.loginPending ? 'update-pending' : '')}
                onClick={this.handleSubmit.bind(this)}
                disabled={this.props.loginPending || this.props.username === '' || this.props.password === ''}
              >
                <i className="glyphicon glyphicon-log-in"/> Log in
              </button>
              <div>
                <a onClick={() => this.props.changePage(Pages.PASSWORD_REQUEST)}>Passwort vergessen</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  loginPending: React.PropTypes.bool.isRequired,
  setPassword: React.PropTypes.func.isRequired,
  message: React.PropTypes.object,
  showTitle: React.PropTypes.bool,
  username: React.PropTypes.string,
  password: React.PropTypes.string
}
