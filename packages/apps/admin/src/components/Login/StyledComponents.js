import styled from 'styled-components'
import {scale, StyledSpan, theme} from 'tocco-ui'

export const StyledSpanLogin = styled(StyledSpan)`
  && {
    text-align: center;
    font-size: ${scale.font(1.3)};
    display: inline-block;
    width: 100%;
    margin: 1rem 0 1.8rem;
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
