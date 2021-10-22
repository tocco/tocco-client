import styled from 'styled-components'
import {AdminLink, Ball, scale, theme} from 'tocco-ui'

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

export const StyledPopper = styled.div`
  width: 350px;
  z-index: 1001; // higher than bm-overlay
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
`

export const StyledNotificationBellWrapper = styled.span`
  position: relative;
`

export const StyledBall = styled(Ball)`
  margin-left: ${scale.space(-0.5)};
`

export const StyledRedDot = styled.span`
  width: 7px;
  height: 7px;
  position: absolute;
  top: 3px;
  left: 21.5px;
  background-color: ${theme.color('secondaryLight')};
  border-radius: 50%;
  display: inline-block;
`
export const StyledHeaderLink = styled(AdminLink)`
  display: inline-block;
  padding: ${scale.space(-1.2)};
`
