import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {createGlobalStyle} from 'styled-components'

import LoginFormContainer from '../../containers/LoginFormContainer'
import PasswordRequestContainer from '../../containers/PasswordRequestContainer'
import PasswordUpdateContainer from '../../containers/PasswordUpdateDialogContainer'
import TwoFactorConnectorContainer from '../../containers/TwoFactorConnectorContainer'
import TwoStepLoginContainer from '../../containers/TwoStepLoginContainer'
import {Pages} from '../../types/Pages'

const GlobalRecaptchaBadgeStyle = createGlobalStyle`
  .grecaptcha-badge {
    z-index: 9999999;
    opacity: .8;
  }
`

const Login = props => {
  useEffect(() => {
    props.initialize()
  }, [])

  return (
    <>
      <GlobalRecaptchaBadgeStyle />
      {(() => {
        switch (props.currentPage) {
          case Pages.PASSWORD_UPDATE:
            return <PasswordUpdateContainer showTitle={props.showTitle} />
          case Pages.PASSWORD_REQUEST:
            return <PasswordRequestContainer showTitle={props.showTitle} />
          case Pages.TWOSTEPLOGIN:
            return <TwoStepLoginContainer showTitle={props.showTitle} />
          case Pages.TWOSTEPLOGIN_ACTIVATION:
            return <TwoFactorConnectorContainer />
          default:
            return <LoginFormContainer showTitle={props.showTitle} />
        }
      })()}
    </>
  )
}

Login.propTypes = {
  initialize: PropTypes.func.isRequired,
  currentPage: PropTypes.string,
  showTitle: PropTypes.bool
}

export default Login
