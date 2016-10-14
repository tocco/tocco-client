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
              return <PasswordUpdateContainer showTitle={this.props.showTitle}/>
            case Pages.PASSWORD_REQUEST:
              return <PasswordRequestContainer showTitle={this.props.showTitle}/>
            default:
              return <LoginFormContainer showTitle={this.props.showTitle}/>
          }
        })()}
      </div>
    )
  }
}

Login.propTypes = {
  currentPage: React.PropTypes.string,
  showTitle: React.PropTypes.bool
}
