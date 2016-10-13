import React from 'react'
import './styles.scss'
import {Pages} from '../../types/Pages'

export class PasswordRequest extends React.Component {
  render() {
    return (
      <div className="login-form">
        {
          !this.props.headless
          && <div>
            <h1>Passwort vergessen?</h1>
            <p>Geben Sie Ihren Benutzernamen an. Wir senden Ihnen das Passwort umgehend per E-Mail.</p>
          </div>
        }
        <form
          name="formRequest"
          id="formRequest"
          className="form-horizontal"
          encType="multipart/form-data"
          method="POST"
        >
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
            <input id="user" type="text" className="form-control" name="user" placeholder="Benutzername / E-Mail"/>
          </div>
          <div>
            <div>
              <button type="submit" href="#" className="btn btn-primary submit-button">
                <i className="glyphicon glyphicon-log-in"/> Anfordern
              </button>
              <button
                onClick={() => this.props.changePage(Pages.LOGIN_FORM)}
                className="btn btn-primary submit-button"
              >
                <i className="glyphicon glyphicon-remove"/> Abbrechen
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

PasswordRequest.propTypes = {
  changePage: React.PropTypes.func.isRequired,
  headless: React.PropTypes.bool
}
