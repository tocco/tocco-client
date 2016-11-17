import React from 'react'
import {Pages} from '../../types/Pages'

import LoginFormContainer from '../../containers/LoginFormContainer'
import PasswordUpdateContainer from '../../containers/PasswordUpdateDialogContainer'
import PasswordRequestContainer from '../../containers/PasswordRequestContainer'
import TwoStepLoginContainer from '../../containers/TwoStepLoginContainer'

export class Login extends React.Component {
  componentDidMount() {
    this.props.checkSession()
  }

  render() {
    return (
      <div className="tocco-login">
        {(() => {
          switch (this.props.currentPage) {
            case Pages.PASSWORD_UPDATE:
              return <PasswordUpdateContainer showTitle={this.props.showTitle} forcedUpdate/>
            case Pages.PASSWORD_REQUEST:
              return <PasswordRequestContainer showTitle={this.props.showTitle}/>
            case Pages.TWOSTEPLOGIN:
              return <TwoStepLoginContainer showTitle={this.props.showTitle}/>
            default:
              return <LoginFormContainer showTitle={this.props.showTitle}/>
          }
        })()}
      </div>
    )
  }
}

Login.propTypes = {
  checkSession: React.PropTypes.func.isRequired,
  currentPage: React.PropTypes.string,
  showTitle: React.PropTypes.bool
}
