import {darken} from 'polished'
import styled from 'styled-components'
import {scale, themeSelector} from 'tocco-ui'

export const StyledTaskProgressWrapper = styled.div`
  margin-bottom: ${scale.space(-1.5)};

  a {
    padding-right: 1rem;
  }
`

export const StyledSpinnerWrapper = styled.span`
  margin-right: ${scale.space(-1.5)};
`

export const StyledProgressOuter = styled.div`
  background-color: ${({theme}) => darken(0.2, theme.colors.backgroundBody)};
  width: 100%;
  height: 5px;
`

export const StyledProgressInner = styled.div`
  background-color: ${themeSelector.color('paper')};
  width: ${({percentage}) => percentage}%;
  height: 5px;
`

export const StyledMessage = styled.span`
  margin-right: ${scale.space(-2)};
`

export const StyledDetailLinkWrapper = styled.div`
  margin-top: ${scale.space(-2)};
  margin-bottom: ${scale.space(-2)};

  * {
    font-size: ${scale.font(-1)};
    text-decoration: none;
  }
`

export const StyledOutputJobWrapper = styled.div`
  a {
    color: ${themeSelector.color('text')};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const StyledFileDescription = styled.div`
  margin-bottom: ${scale.space(0)};

  && {
    a {
      text-decoration: underline;
    }
  }
`

export const StyledIconWrapper = styled.span`
  padding-right: ${scale.space(-1.5)};
`

export const StyledCancelWrapper = styled.div`
  color: ${themeSelector.color('text')};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
