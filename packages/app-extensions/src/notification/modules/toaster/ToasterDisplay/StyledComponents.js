import styled, {keyframes} from 'styled-components'
import {Ball, declareFont, scale, StyledH1, theme} from 'tocco-ui'

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

const colorMapper = (type, theme) => colorMap[type]
  ? theme.colors.signal[colorMap[type]].text
  : '#ccc'

export const StyledToaster = styled.div`
  background-color: ${({type, theme}) => colorMapper(type, theme)};
  margin-top: ${scale.space(-0.5)};
  padding: ${scale.space(-0.5)};

  * {
    color: ${theme.color('paper')} !important;
  }
  animation-name: ${fadeIn};
  animation-duration: .8s;
`

export const StyledCloseButton = styled(Ball)`
  padding: 0;
  font-size: ${scale.font(1.5)};
  color: ${theme.color('backgroundBody')};
  float: right;
  opacity: .9;

  &,
  &:hover {
    background-color: transparent;
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
    color: ${theme.color('paper')};
  }
`

export const StyledIconTitleWrapper = styled.div`
  display: flex;
  align-items: baseline;

  ${StyledH1} {
    margin-top: 0;
  }
`

export const StyledIconWrapper = styled.div`
  font-size: ${scale.font(7)};
  padding-right: ${scale.space(-0.5)};
`

export const StyledContentWrapper = styled.div`
  padding-top: ${scale.space(-0.5)};
  color: ${theme.color('paper')};
`

export const StyledToasterBox = styled.div`
  ${declareFont()};
  position: absolute;
  height: 100%;
  width: 310px;
  margin-top: 40px; // height of Header to prevent coverage
  right: 10px;
  z-index: 1001;
`
