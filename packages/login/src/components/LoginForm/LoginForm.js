import React from 'react'
import './styles.scss'
import {Pages} from '../../types/Pages'

export class LoginForm extends React.Component {
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
        <form name="formLogin" id="formLogin" className="form-horizontal" method="POST">
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
            <input id="user" type="text" className="form-control" name="user" placeholder="Benutzername / E-Mail"/>
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
            <input id="password" type="password" className="form-control" name="password" placeholder="Passwort"/>
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
  changePage: React.PropTypes.func.isRequired,
  headless: React.PropTypes.bool
}
