import styled from 'styled-components'
import {scale, StyledScrollbar, theme} from 'tocco-ui'

export const Box = styled.div`
  background-color: ${theme.color('paper')};
  overflow-y: auto;
  padding: ${scale.space(-1.1)} ${scale.space(-0.375)} 0 ${scale.space(-1.1)};
  position: relative;

  &:first-of-type {
    z-index: 2; // higher than StyledTether to prevent cover on scroll
  }
  ${StyledScrollbar}
`

export const StyledExtendSearchButtonWrapper = styled.div`
  && {
    width: 100%;
    text-align: center;
  }
`
