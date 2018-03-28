import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Button} from 'tocco-ui'

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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <p><FormattedMessage id="client.login.twoStepLogin.introduction"/></p>
          <p><FormattedMessage id="client.login.twoStepLogin.requestedCode"/>{this.props.requestedCode}</p>
          <div className="form-group dense">
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
          </div>
          <div>
            <Button
              disabled={!this.state.userCode || this.props.loginPending}
              ink="primary"
              label={this.msg('client.login.form.button')}
              name="submit"
              pending={this.props.loginPending}
              type="submit"
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
  twoStepLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  requestedCode: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  loginPending: PropTypes.bool
}
