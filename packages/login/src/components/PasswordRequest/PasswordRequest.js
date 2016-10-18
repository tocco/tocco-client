import React from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Pages} from '../../types/Pages'

import '../Login/styles.scss'

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
            <h1><FormattedMessage id="client.login.passwordRequest.title"/></h1>
          </div>
        }
        <p><FormattedMessage id="client.login.passwordRequest.introduction"/></p>
        <form>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
            <input
              id="user"
              type="text"
              className="form-control"
              name="user"
              placeholder={this.msg('client.login.form.userPlaceholder')}
              onChange={this.handleUsername.bind(this)}
            />
          </div>
          <div>
            <div>
              <button
                type="button"
                disabled={!this.state.username}
                className="btn btn-primary  m-t-5"
                onClick={this.handleSubmit.bind(this)}
              >
                <i className="glyphicon glyphicon-log-in"/>
                <span className="p-l-5"><FormattedMessage id="client.login.passwordRequest.button"/></span>
              </button>
              <button
                type="button"
                onClick={() => this.props.changePage(Pages.LOGIN_FORM)}
                className="btn btn-primary m-l-5 m-t-5"
              >
                <i className="glyphicon glyphicon-remove"/>
                <span className="p-l-5"><FormattedMessage id="client.login.passwordRequest.abortButton"/></span>
              </button>
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

PasswordRequest.propTypes = {
  intl: intlShape.isRequired,
  changePage: React.PropTypes.func.isRequired,
  requestPassword: React.PropTypes.func.isRequired,
  showTitle: React.PropTypes.bool
}
