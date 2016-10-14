import React from 'react'
import './styles.scss'
import {Pages} from '../../types/Pages'

export class PasswordRequest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {username: ''}
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.requestPassword(this.state.username)
  }

  handleUsername(e) {
    this.setState({username: e.target.value})
  }

  render() {
    return (
      <div className="login-form">
        {
          this.props.showTitle
          && <div>
            <h1>Passwort vergessen?</h1>
            <p>Geben Sie Ihren Benutzernamen an. Wir senden Ihnen das Passwort umgehend per E-Mail.</p>
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
              placeholder="Benutzername / E-Mail"
              onChange={this.handleUsername.bind(this)}
            />
          </div>
          <div>
            <div>
              <button
                type="button"
                disabled={!this.state.username}
                className="btn btn-primary submit-button"
                onClick={this.handleSubmit.bind(this)}
              >
                <i className="glyphicon glyphicon-log-in"/> Anfordern
              </button>
              <button
                type="button"
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
  requestPassword: React.PropTypes.func.isRequired,
  showTitle: React.PropTypes.bool
}
