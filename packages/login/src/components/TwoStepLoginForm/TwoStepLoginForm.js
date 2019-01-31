import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {
  Button,
  Icon,
  Typography
} from 'tocco-ui'

import StyledTwoStepLoginForm from './StyledTwoStepLoginForm'

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
      <StyledTwoStepLoginForm className="login-form">
        {this.props.showTitle
          && <Typography.H5><FormattedMessage id="client.login.form.title"/></Typography.H5>}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Typography.P><FormattedMessage id="client.login.twoStepLogin.introduction"/></Typography.P>
          <Typography.P>
            <FormattedMessage id="client.login.twoStepLogin.requestedCode"/>{this.props.requestedCode}
          </Typography.P>
          <div className="form-group dense">
            <div className="input-group">
              <span className="input-group-addon"><Icon icon="unlock"/></span>
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
          <Button
            disabled={!this.state.userCode || this.props.loginPending}
            ink="primary"
            label={this.msg('client.login.form.button')}
            look="raised"
            name="submit"
            pending={this.props.loginPending}
            type="submit"
          />
        </form>
      </StyledTwoStepLoginForm>
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
