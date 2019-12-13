import React from 'react'
import PropTypes from 'prop-types'
import ToccoLogin from 'tocco-login/src/main'
import SsoLogin from 'tocco-sso-login/src/main'
import styled from 'styled-components'
import {StyledH1, StyledSpan, scale} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import ToccoLogo from '../../assets/tocco-circle.svg'
import ToccoSlogan from '../../assets/tocco-white-vertical.svg'

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

const StyledHeadingLogin = styled(StyledH1)`
  && {
    font-size: ${scale.font(11)};
    margin-bottom: 5rem;
  }
`
const StyledSpanLogin = styled(StyledSpan)`
  && {
    text-align: center;
    font-size: ${scale.font(1.3)};
    display: inline-block;
    width: 100%;
    margin: 3rem 0 4rem 0;
  }
`

const LoginWrapper = styled.div`
  max-width: 490px;
  margin: 6% 5% 0 26%;
  
  && {
    .tocco-login * {
      font-size: ${scale.font(1.3)}
    }
  }
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
        <StyledHeadingLogin><FormattedMessage id="client.admin.welcomeTitle"/></StyledHeadingLogin>
        <SsoLogin
          ssoLoginEndpoint="/sso"
        />
        <StyledSpanLogin><FormattedMessage id="client.admin.loginChoice"/></StyledSpanLogin>
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
