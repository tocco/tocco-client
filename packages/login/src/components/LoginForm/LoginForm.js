import React, {Component} from 'react'
import './styles.scss'
import {Pages} from '../../types/Pages'

export class LoginForm extends Component {

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  handleUsername(e) {
    this.setState({username: e.target.value})
  }

  handlePassword(e) {
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <div className="login-form">
        {
          !this.props.headless
          && <div>
            <h1>Login</h1>
            <p>Dieser Bereich ist privat. Bitte melden Sie sich an.</p>
          </div>
        }
        <form
          name="form"
          id="form"
          className="form-horizontal"
          method="POST"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
            <input
              id="user"
              type="text"
              className="form-control"
              name="user"
              onChange={this.handleUsername.bind(this)}
              placeholder="Benutzername / E-Mail"
            />
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              onChange={this.handlePassword.bind(this)}
              placeholder="Passwort"
            />
          </div>
          <div>
            <div>
              <button type="submit" href="#" className="btn btn-primary submit-button"><i
                className="glyphicon glyphicon-log-in"/> Log in
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
  headless: React.PropTypes.bool
}
