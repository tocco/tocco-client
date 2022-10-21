import styled, {createGlobalStyle} from 'styled-components'
import {scale, StyledH1, StyledSpan, theme} from 'tocco-ui'

import ToccoLogo from '../../assets/tocco-circle.svg'

// Overwrite index.html overflow which is hidden
export const GlobalBodyStyle = createGlobalStyle`
  @media (max-width: 1024px) {
    body {
      overflow: auto !important;
    }
  }
`

export const StyledLogin = styled.div`
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

  @media (max-width: 1024px) {
    background-size: 2000px;
    background-position: 50% -1850px;
  }

  @media (max-width: 425px) {
    background-position: 50% -1890px;
  }
`

export const StyledHeadingLogin = styled(StyledH1)`
  && {
    font-size: ${scale.font(11)};
  }
`
export const StyledSpanLogin = styled(StyledSpan)`
  && {
    text-align: center;
    font-size: ${scale.font(1.3)};
    display: inline-block;
    width: 100%;
    margin: 1rem 0 1.8rem;
  }
`

export const StyledLoginWrapper = styled.div`
  max-width: 410px;
  margin: 6% 5% 0 28%;

  && {
    .tocco-login * {
      font-size: ${scale.font(1.3)};
    }

    @media (max-width: 1024px) {
      margin: 14rem auto 0;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    @media (max-width: 425px) {
      margin-top: 12rem;
    }
  }
`

export const StyledSloganImg = styled.img`
  transform: rotate(270deg);
  position: relative;
  top: 12.5vw;
  left: -8%;
  width: 25vw;

  @media (max-width: 1024px) {
    display: none;
  }
`

export const StyledMobileSloganImg = styled.img`
  display: none;
  max-width: 400px;
  width: 95%;
  height: auto;
  position: relative;
  margin: auto;
  top: 45px;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 425px) {
    max-width: 280px;
  }
`

export const StyledSsoMsg = styled(StyledSpan)`
  && {
    display: inline-block;
    text-align: center;
    font-weight: ${theme.fontWeight('bold')};
    width: 100%;
    color: ${theme.color('signal.info.text')};
  }
`

export const StyledSsoError = styled(StyledSsoMsg)`
  && {
    color: ${theme.color('signal.danger.text')};
  }
`
