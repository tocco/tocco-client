import styled, {keyframes} from 'styled-components'
import {Ball, declareFont, scale, StyledH1, themeSelector} from 'tocco-ui'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const colorMap = {
  info: 'info',
  success: 'success',
  error: 'danger',
  warning: 'warning'
}

const colorMapper = (type, theme) => (colorMap[type] ? theme.colors.signal[colorMap[type]].text : '#ccc')

export const StyledToaster = styled.div`
  background-color: ${({type, theme}) => colorMapper(type, theme)};
  margin-bottom: ${scale.space(-0.5)};
  padding: ${scale.space(-0.5)};

  *,
  a:link // reset legacy styling
  {
    color: ${themeSelector.color('paper')} !important;
  }
  animation-name: ${fadeIn};
  animation-duration: 0.8s;
  pointer-events: auto;
`

export const StyledCloseButton = styled(Ball)`
  padding: 0;
  font-size: ${scale.font(3)};
  color: ${themeSelector.color('backgroundBody')};
  float: right;
  opacity: 0.9;

  &,
  &:hover {
    background-color: transparent;
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
    color: ${themeSelector.color('paper')};
  }
`

export const StyledIconTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: ${scale.space(0)};

  ${StyledH1} {
    margin-top: 0;
  }
`

export const StyledTitleWrapper = styled.span`
  font-size: ${scale.font(1.5)};
  font-weight: ${themeSelector.fontWeight('regular')};
  position: relative;
  bottom: 2px;
`

export const StyledIconWrapper = styled.div`
  font-size: ${scale.font(7)};
  padding-right: ${scale.space(-1.5)};
`

export const StyledContentWrapper = styled.div`
  padding-top: ${scale.space(-1)};
  color: ${themeSelector.color('paper')};
`

export const StyledToasterBox = styled.div`
  pointer-events: none;
  ${declareFont()};
  position: fixed;
  height: 100%;
  width: 310px;
  top: 40px; // height of Header to prevent coverage
  right: 10px;
  // lower than StyledModalHolder and very high value to prevent other elements blocking it when implemented as a widget
  z-index: 99999;
`
