import styled from 'styled-components'
import {AdminLink, Ball, scale, themeSelector, StyledButton, StyledLabelWrapper} from 'tocco-ui'

import ToccoLogo from '../../assets/tocco-circle.svg'

// intermediate div to add a white background below StyledBackgroundLogo
export const StyledBackgroundCover = styled.div`
  position: absolute;
  z-index: 2; // higher than StyledTether to prevent cover on scroll
  height: 40px;
  width: 100%;
  background-color: ${themeSelector.color('paper')};
`

export const StyledHeader = styled.div`
  grid-area: header;
  width: calc(100vw - 50px); // absolute width necessary for FireFox
  height: 40px;
  padding-right: 10px;
  margin-left: 40px;
  position: relative;
  z-index: 3; // higher than StyledBackgroundCover to enable button interactions

  ${StyledButton} {
    overflow: hidden;

    ${StyledLabelWrapper} {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`

export const StyledConfig = styled.div`
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
  background-color: ${({runEnv, theme}) => (runEnv === 'PRODUCTION' ? theme.colors.primary : theme.colors.secondary)};
  mask-image: url(${ToccoLogo});
  mask-repeat: no-repeat;
  mask-position: -300px -900px;
`

export const StyledPopper = styled.div`
  width: 350px;
  z-index: 1001; // higher than bm-overlay
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
  background-color: ${themeSelector.color('secondaryLight')};
  border-radius: 50%;
  display: inline-block;
`
export const StyledHeaderLink = styled(AdminLink)`
  display: inline-block;
  padding: ${scale.space(-2.1)} ${scale.space(0)};
`

export const StyledBallMenuWrapper = styled.span`
  display: flex;
  margin-top: 2px;

  ${StyledBall} {
    font-size: ${scale.font(1)};
  }
`
