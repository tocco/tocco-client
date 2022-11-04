import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import ToccoLogin from 'tocco-login/src/main'
import SsoLogin from 'tocco-sso-login/src/main'

import ToccoSlogan from '../../assets/tocco_white.svg'
import {
  StyledSsoMsg,
  StyledSsoError,
  StyledSpanLogin,
  StyledLogin,
  StyledMobileSloganImg,
  StyledSloganImg,
  StyledLoginWrapper,
  StyledHeadingLogin,
  GlobalBodyStyle
} from './StyledComponents'

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
    <>
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
    </>
  )

  return (
    <>
      <GlobalBodyStyle />
      <StyledLogin>
        <StyledMobileSloganImg src={ToccoSlogan} alt="Tocco Slogan" height="42.3" width="460" />
        <StyledSloganImg src={ToccoSlogan} alt="Tocco Slogan" height="42.3" width="460" />
        <StyledLoginWrapper>
          <StyledHeadingLogin>
            <FormattedMessage id="client.admin.welcomeTitle" />
          </StyledHeadingLogin>
          {ssoAvailable && <SsoLoginPart />}
          <ToccoLogin loginSuccess={loginSuccessful} showTitle={false} />
        </StyledLoginWrapper>
      </StyledLogin>
    </>
  )
}

Login.propTypes = {
  ssoAvailable: PropTypes.bool,
  loginSuccessful: PropTypes.func.isRequired,
  checkSsoAvailable: PropTypes.func.isRequired
}

export default Login
