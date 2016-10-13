import React from 'react'
import {Pages} from '../../types/Pages'

import LoginFormContainer from '../../containers/LoginFormContainer'
import PasswordUpdateContainer from '../../containers/PasswordUpdateDialogContainer'
import PasswordRequestContainer from '../../containers/PasswordRequestContainer'

export class Login extends React.Component {
  render() {
    return (
      <div>
        {(() => {
          switch (this.props.currentPage) {
            case Pages.PASSWORD_UPDATE:
              return <PasswordUpdateContainer showTitle={this.props.headless}/>
            case Pages.PASSWORD_REQUEST:
              return <PasswordRequestContainer showTitle={this.props.headless}/>
            default:
              return <LoginFormContainer headless={this.props.headless}/>
          }
        })()}
      </div>
    )
  }
}

Login.propTypes = {
  currentPage: React.PropTypes.string,
  headless: React.PropTypes.bool
}
