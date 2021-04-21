import styled from 'styled-components'
import {theme} from 'tocco-ui'

import ToccoLogo from '../../assets/tocco-circle.svg'

// intermediate div to add a white background below StyledBackgroundLogo
export const StyledBackgroundCover = styled.div`
  position: absolute;
  z-index: 2; // higher than StyledTether to prevent cover on scroll
  height: 40px;
  width: 100%;
  background-color: ${theme.color('paper')};
`
export const StyledHeader = styled.div`
  grid-area: header;
  display: flex;
  height: 40px;
  padding-right: 10px;
  padding-left: 40px;
  position: relative;
  z-index: 3; // higher than StyledBackgroundCover to enable button interactions
`

export const StyledConfig = styled.div`
  flex: 1;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  padding: 7px;
`
export const StyledBackgroundLogo = styled.div`
  position: absolute;
  z-index: 3; // higher than StyledBackgroundCover to prevent coverage
  height: 40px;
  width: 100%;
  background-color: ${({runEnv, theme}) => runEnv === 'PRODUCTION' ? theme.colors.primary : theme.colors.secondary};
  mask-image: url(${ToccoLogo});
  mask-repeat: no-repeat;
  mask-position: -300px -900px;
`
