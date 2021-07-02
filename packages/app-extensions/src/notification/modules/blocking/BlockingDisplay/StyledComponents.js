import styled from 'styled-components'
import {scale, theme} from 'tocco-ui'

export const StyledPageOverlay = styled.div`
  background-color: rgba(50, 50, 50, .7);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4; // higher than StyledHeader
`

export const StyledBlockingDisplay = styled.div`
  z-index: 1001;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-155px);
  width: 310px;
  padding: ${scale.space(-0.5)};
  background-color: ${theme.color('signal.info.text')};

  * {
    color: ${theme.color('paper')};
  }
`

export const StyledTitleWrapper = styled.span`
  color: ${theme.color('paper')};
  font-size: ${scale.font(1.5)};
  font-weight: ${theme.fontWeight('regular')};
`
