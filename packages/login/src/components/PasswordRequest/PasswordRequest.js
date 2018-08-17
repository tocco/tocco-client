import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage, intlShape} from 'react-intl'

import {Pages} from '../../types/Pages'
import {
  Button,
  ButtonGroup,
  Icon
} from 'tocco-ui'

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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group dense">
            <div className="input-group">
              <span className="input-group-addon"><Icon icon="user"/></span>
              <input
                type="text"
                className="form-control"
                name="user"
                placeholder={this.msg('client.login.form.userPlaceholder')}
                onChange={this.handleUsernameChange.bind(this)}
              />
            </div>
          </div>
          <div>
            <ButtonGroup look="raised">
              <Button
                disabled={!this.state.username || this.props.pending}
                ink="primary"
                label={this.msg('client.login.passwordRequest.button')}
                pending={this.props.pending}
                type="submit"
              />
              <Button
                disabled={this.props.pending}
                label={this.msg('client.login.passwordRequest.abortButton')}
                name="abort"
                onClick={() => this.props.changePage(Pages.LOGIN_FORM)}
              />
            </ButtonGroup>
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
  changePage: PropTypes.func.isRequired,
  requestPassword: PropTypes.func.isRequired,
  showTitle: PropTypes.bool,
  pending: PropTypes.bool
}
