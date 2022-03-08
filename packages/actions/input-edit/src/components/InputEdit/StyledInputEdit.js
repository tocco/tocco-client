import styled, {css} from 'styled-components'
import {Button, scale, StyledScrollbar, theme} from 'tocco-ui'

export const StyledPaneWrapper = styled.div`
  display: flex;
  height: 100%;
`

const sharedSplitPaneStyles = css`
  background-color: ${theme.color('paper')};
  padding-top: ${scale.space(-0.53)};
  ${StyledScrollbar}
`

export const StyledPanelWrapperLeft = styled.div`
  && {
    display: ${({isCollapsed}) => (isCollapsed ? 'none' : 'block')};
    min-width: 265px;
    width: 16%;
    margin-right: 1rem;
    ${sharedSplitPaneStyles}
  }
`

export const StyledPanelWrapperRight = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
    ${sharedSplitPaneStyles}
  }
`

export const StyledInputEditSearchWrapper = styled.div`
  margin-bottom: ${scale.space(0)};
`

export const StyledLeftPane = styled.div`
  padding: 0 ${scale.space(-1)};
`

export const StyledActionsWrapper = styled.div`
  border-bottom: 3px solid ${theme.color('backgroundBody')};
  padding: 0 8px 8px;
`

export const StyledToggleCollapse = styled.div`
  display: flex;
  background-color: ${theme.color('paper')};
  padding: 0 ${scale.space(-0.53)} ${scale.space(-0.53)} ${scale.space(-1.7)};
`

export const StyledPlaceHolder = styled.div`
  display: ${({isCollapsed}) => (isCollapsed ? 'flex' : 'none')};
  flex: 1;
  height: 100%;
  width: 25px;
  margin-right: ${scale.space(-0.375)};
  background: ${theme.color('paper')};
  padding-top: ${scale.space(-0.53)};
  align-items: flex-start;

  &:hover {
    cursor: pointer;
  }

  ${StyledToggleCollapse} {
    padding: 0 0 ${scale.space(-0.53)} ${scale.space(-1.7)};
  }
`

export const StyledToggleCollapseButton = styled(Button)`
  font-size: ${scale.font(0)};
  padding: 0;

  &:hover,
  &:focus,
  ${/* sc-selector */ StyledPlaceHolder}:hover & {
    background-color: transparent;
    color: ${theme.color('secondaryLight')};
  }
`
