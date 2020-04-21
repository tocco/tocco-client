import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'
import {createGlobalStyle} from 'styled-components'

import {Pages} from '../../types/Pages'
import LoginFormContainer from '../../containers/LoginFormContainer'
import PasswordUpdateContainer from '../../containers/PasswordUpdateDialogContainer'
import PasswordRequestContainer from '../../containers/PasswordRequestContainer'
import TwoStepLoginContainer from '../../containers/TwoStepLoginContainer'

const GlobalRecaptchaBadgeStyle = createGlobalStyle`
  .grecaptcha-badge {
    z-index: 9999999;
    opacity: .8;
  }
`

// Can be removed as soon as new react-google-recaptcha-v3 version > 1.5.0 is released.
// https://github.com/t49tran/react-google-recaptcha-v3/pull/21
const cleanUpRecaptcha = () => {
  const nodeBadge = document.querySelector('.grecaptcha-badge')
  if (nodeBadge && nodeBadge.parentNode) {
    document.body.removeChild(nodeBadge.parentNode)
  }

  const script = document.querySelector('#google-recaptcha-v3')
  if (script) {
    script.remove()
  }
}

const Login = props => {
  useEffect(() => {
    props.initialize()

    return () => {
      cleanUpRecaptcha()
    }
  }, [])

  return (
    <GoogleReCaptchaProvider reCaptchaKey={props.captchaKey}>
      <GlobalRecaptchaBadgeStyle/>
      {(() => {
        switch (props.currentPage) {
          case Pages.PASSWORD_UPDATE:
            return <PasswordUpdateContainer showTitle={props.showTitle}/>
          case Pages.PASSWORD_REQUEST:
            return <PasswordRequestContainer showTitle={props.showTitle}/>
          case Pages.TWOSTEPLOGIN:
            return <TwoStepLoginContainer showTitle={props.showTitle}/>
          default:
            return <LoginFormContainer showTitle={props.showTitle}/>
        }
      })()}
    </GoogleReCaptchaProvider>
  )
}

Login.propTypes = {
  initialize: PropTypes.func.isRequired,
  currentPage: PropTypes.string,
  captchaKey: PropTypes.string,
  showTitle: PropTypes.bool
}

export default Login
