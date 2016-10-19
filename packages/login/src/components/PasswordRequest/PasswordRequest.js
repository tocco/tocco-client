import React from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Pages} from '../../types/Pages'
import * as Tocco from 'tocco-ui'

import '../Login/styles.scss'

export class PasswordRequest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.requestPassword(this.state.username)
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <div className="login-form">
        {this.props.showTitle && <h1><FormattedMessage id="client.login.passwordRequest.title"/></h1>}
        <p><FormattedMessage id="client.login.passwordRequest.introduction"/></p>
        <form>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
            <input
              type="text"
              className="form-control"
              name="user"
              placeholder={this.msg('client.login.form.userPlaceholder')}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
          <div>
            <div>
              <Tocco.Button
                label={this.msg('client.login.passwordRequest.button')}
                name="submit"
                onClick={this.handleSubmit.bind(this)}
                disabled={!this.state.username || this.props.pending}
                pending={this.props.pending}
                icon="glyphicon-log-in"
                className="m-t-5"
              />
              <Tocco.Button
                label={this.msg('client.login.passwordRequest.abortButton')}
                name="abort"
                onClick={() => this.props.changePage(Pages.LOGIN_FORM)}
                disabled={this.props.pending}
                icon="glyphicon-remove"
                className="m-l-5 m-t-5"
              />
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
  showTitle: React.PropTypes.bool,
  pending: React.PropTypes.bool
}
