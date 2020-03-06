import React from 'react'
import PropTypes from 'prop-types'
import ToccoLogin from 'tocco-login/src/main'
import SsoLogin from 'tocco-sso-login/src/main'
import styled from 'styled-components'
import {StyledH1, StyledSpan, scale} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import ToccoLogo from '../../assets/tocco-circle.svg'
import ToccoSlogan from '../../assets/tocco_white.svg'

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

  @media(max-width: 1024px) {
    background-size: 2000px;
    background-position: 50% -1850px;
  }

  @media(max-width: 425px) {
    background-position: 50% -1890px;
  }
`

const StyledHeadingLogin = styled(StyledH1)`
  && {
    font-size: ${scale.font(11)};
    margin-bottom: 2.5rem;

    @media(max-width: 1024px) {
      margin-bottom: 1.5rem;
    }
  }
`
const StyledSpanLogin = styled(StyledSpan)`
  && {
    text-align: center;
    font-size: ${scale.font(1.3)};
    display: inline-block;
    width: 100%;
    margin: 1rem 0 1.8rem 0;
  }
`

const LoginWrapper = styled.div`
  max-width: 410px;
  margin: 6% 5% 0 28%;

  && {
    .tocco-login * {
      font-size: ${scale.font(1.3)}
    }

    @media(max-width: 1024px) {
      margin: 14rem auto 0 auto;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    @media(max-width: 425px) {
      margin-top: 8rem;
    }
  }
`

const SloganImg = styled.img`
  transform: rotate(270deg);
  position: relative;
  top: 12.5vw;
  left: -8%;
  width: 25vw;

  @media(max-width: 1024px) {
    display: none;
  }
`

const StyledImg = styled.img`
  display: none;
  max-width: 400px;
  width: 95%;
  height: auto;
  margin: 45px auto 0 auto;

  @media(max-width: 1024px) {
    display: block;
  }

  @media(max-width: 425px) {
    max-width: 280px;
    margin-top: 40px;
  }
`

const Login = props => {
  const loginSuccess = ({timeout}) => {
    props.loginSuccessful(timeout)
  }

  return (
    <StyledLogin>
      <StyledImg src={ToccoSlogan}/>
      <SloganImg src={ToccoSlogan}/>
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
