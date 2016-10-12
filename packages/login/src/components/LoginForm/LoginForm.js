import React from 'react'
import './styles.scss'

export class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-form">
        <form name="form" id="form" className="form-horizontal" encType="multipart/form-data" method="POST">
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
                <a href="#">Passwort vergessen</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {}
