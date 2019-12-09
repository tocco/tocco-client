import React from 'react'
import PropTypes from 'prop-types'
import ToccoLogin from 'tocco-login/src/main'
import SsoLogin from 'tocco-sso-login/src/main'
import styled from 'styled-components'
import {Typography, ToccoLogo, ToccoSlogan} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

const StyledLogin = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-image: url(${ToccoLogo});
  background-repeat: no-repeat;
  background-size: 61vw;
  background-position-y: -25vw;
  background-position-x: -41vw;
  
  .tocco-sso-login {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.8rem;
  }
`

const LoginWrapper = styled.div`
  max-width: 490px;
  margin: 5% 5% 0 28%;
`

const Slogan = styled.div`
  background-image: url(${ToccoSlogan});
  background-repeat: no-repeat;
  background-size: 11.5vw 27vw;
  background-position: -30px 10px;
  position: fixed;
  top: 1.5em;
  left: 0;
  width: 11.5vw;
  height: 28vw;
`

const Login = props => {
  const loginSuccess = ({timeout}) => {
    props.loginSuccessful(timeout)
  }

  return (
    <StyledLogin>
      <Slogan/>
      <LoginWrapper>
        <Typography.H1><FormattedMessage id="client.admin.welcomeTitle"/></Typography.H1>
        <SsoLogin
          ssoLoginEndpoint="/sso"
        />
        <Typography.Span><FormattedMessage id="client.admin.loginChoice"/></Typography.Span>
        <ToccoLogin
          loginSuccess={loginSuccess}
          showTitle={false}
        />
      </LoginWrapper>
    </StyledLogin>
  )
}

Login.propTypes = {
  loginSuccessful: PropTypes.func.isRequired
}

export default Login
