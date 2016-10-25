import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import * as ToccoUI from 'tocco-ui'

import '../Login/styles.scss'

export class TwoStepLoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userCode: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.twoStepLogin(this.props.username, this.props.password, this.props.requestedCode, this.state.userCode)
  }

  handleUserCodeChange(e) {
    this.setState({
      userCode: e.target.value
    })
  }

  render() {
    return (
      <div className="login-form">
        {this.props.showTitle && <h1><FormattedMessage id="client.login.form.title"/></h1>}
        <form>
          <p><FormattedMessage id="client.login.twoStepLogin.introduction"/></p>
          <p><FormattedMessage id="client.login.twoStepLogin.requestedCode"/>{this.props.requestedCode}</p>
          <div className="input-group">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
            <input
              type="text"
              className="form-control"
              name="code"
              autoComplete="off"
              onChange={this.handleUserCodeChange.bind(this)}
              placeholder={this.msg('client.login.twoStepLogin.codePlaceholder')}
            />
          </div>
          <div>
            <ToccoUI.Button
              label={this.msg('client.login.form.button')}
              name="submit"
              onClick={this.handleSubmit.bind(this)}
              disabled={!this.state.userCode || this.props.loginPending}
              pending={this.props.loginPending}
              icon="glyphicon-log-in"
              className="m-t-5"
            />
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

TwoStepLoginForm.propTypes = {
  intl: intlShape.isRequired,
  twoStepLogin: React.PropTypes.func.isRequired,
  username: React.PropTypes.string,
  password: React.PropTypes.string,
  requestedCode: React.PropTypes.string,
  showTitle: React.PropTypes.bool,
  loginPending: React.PropTypes.bool
}
