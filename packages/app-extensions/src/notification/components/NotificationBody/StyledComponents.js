import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'
import {darken} from 'polished'

export const StyledTaskProgressWrapper = styled.div`
  margin-bottom: ${scale.space(-2)};
`

export const StyledSpinnerWrapper = styled.span`
  margin-right: ${scale.space(-2)};
`

export const StyledProgressOuter = styled.div`
  background-color: ${({theme}) => darken(0.2, theme.colors.backgroundBody)};
  width: 100%;
  height: 7px;
`

export const StyledProgressInner = styled.div`
  background-color: ${theme.color('signal.info.text')};
  width: ${({percentage}) => percentage}%;
  height: 7px;
`

export const StyledProgressMessage = styled.span`
  margin-right: ${scale.space(-2)};
`

export const StyledDetailLinkWrapper = styled.div`
  margin-top: ${scale.space(-2)};
  margin-bottom: ${scale.space(-2)};

  * {
    font-size: ${scale.font(-1)};
  }
`

export const StyledOutputJobWrapper = styled.div`
  a {
    color: ${theme.color('text')};

    &:hover {
      color: ${theme.color('secondaryLight')};
    }
  }
`
