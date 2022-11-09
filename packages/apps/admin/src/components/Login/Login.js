import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import ToccoLogin from 'tocco-login/src/main'
import SsoLogin from 'tocco-sso-login/src/main'

import {StyledSsoMsg, StyledSsoError, StyledSpanLogin} from './StyledComponents'

const Login = ({ssoAvailable, loginSuccessful, checkSsoAvailable}) => {
  const [showError, setShowError] = useState(false)
  const [showRegistrationText, setShowRegistrationText] = useState(false)
  const autoLogin = Cookies.get('sso-autologin')

  useEffect(() => {
    checkSsoAvailable()
  }, [checkSsoAvailable])

  const ssoLoginCompleted = ({successful, provider, registration}) => {
    if (successful) {
      Cookies.set('sso-autologin', provider, {expires: 365})
      loginSuccessful()
    } else if (!successful && registration) {
      setShowRegistrationText(true)
    } else {
      setShowError(true)
    }
  }

  const SsoLoginPart = () => (
    <div>
      <SsoLogin ssoLoginEndpoint="/sso" loginCompleted={ssoLoginCompleted} autoLogin={autoLogin} />
      {showRegistrationText && (
        <StyledSsoMsg breakWords={true}>
          <FormattedMessage id="client.sso-login.registration" />
        </StyledSsoMsg>
      )}
      {showError && (
        <StyledSsoError breakWords={true}>
          <FormattedMessage id="client.sso-login.error" />
        </StyledSsoError>
      )}
      <StyledSpanLogin>
        <FormattedMessage id="client.admin.loginChoice" />
      </StyledSpanLogin>
    </div>
  )

  return (
    <>
      {ssoAvailable && <SsoLoginPart />}
      <div>
        <ToccoLogin loginSuccess={loginSuccessful} showTitle={false} />
      </div>
    </>
  )
}

Login.propTypes = {
  ssoAvailable: PropTypes.bool,
  loginSuccessful: PropTypes.func.isRequired,
  checkSsoAvailable: PropTypes.func.isRequired
}

export default Login
