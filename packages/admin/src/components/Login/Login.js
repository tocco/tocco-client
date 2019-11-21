import React from 'react'
import PropTypes from 'prop-types'
import ToccoLogin from 'tocco-login/src/main'
import SsoLogin from 'tocco-sso-login/src/main'
import styled from 'styled-components'
import {Typography} from 'tocco-ui'

import toccoLogo from './img/tocco-circle.svg'
import toccoSlogan from './img/tocco-white-vertical.svg'

const StyledLogin = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-image: url(${toccoLogo});
  background-repeat: no-repeat;
  background-size: 61vw;
  background-position-y: -25vw;
  background-position-x: -41vw;
`

const LoginWrapper = styled.div`
  max-width: 490px;
  margin-left: 28%;
  margin-top: 5%;
`

const Slogan = styled.div`
  background-image: url(${toccoSlogan});
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
        <Typography.H1>Login</Typography.H1>
        <ToccoLogin
          loginSuccess={loginSuccess}
          showTitle={false}
        />
        <SsoLogin
          ssoLoginEndpoint="/sso"
        />
      </LoginWrapper>
    </StyledLogin>
  )
}

Login.propTypes = {
  loginSuccessful: PropTypes.func.isRequired
}

export default Login
