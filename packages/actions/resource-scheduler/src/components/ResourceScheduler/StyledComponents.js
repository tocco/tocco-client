import Split from 'react-split'
import styled, {css} from 'styled-components'
import {Button, scale, StyledScrollbar, theme} from 'tocco-ui'

const drawerSymbol =
  // eslint-disable-next-line max-len
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg=='

export const StyledResourceSchedulerWrapper = styled.div`
  display: flex;
  height: 100%;
`

export const StyledSplitPanelWrapperLeft = styled.div`
  && {
    display: ${({isCollapsed}) => (isCollapsed ? 'none' : 'block')};
    background-color: ${theme.color('paper')};
    height: 100%;
    overflow: auto;
    padding-right: ${scale.space(-1)};
    padding-left: ${scale.space(-1)};
    padding-top: ${scale.space(-1)};
    ${StyledScrollbar}
  }
`

export const StyledSplitPanelWrapperRight = styled.div`
  && {
    background-color: ${theme.color('paper')};
    height: 100%;
    overflow: auto;
    padding-left: ${scale.space(-1)};
    padding-right: ${scale.space(-1)};
    ${StyledScrollbar}
  }
`

export const StyledToggleCollapse = styled.div`
  display: flex;
  background-color: ${theme.color('paper')};
  padding: 0 ${scale.space(-0.53)} ${scale.space(-0.53)} ${scale.space(-1.7)};
`

export const StyledPlaceHolder = styled.div`
  display: ${({isCollapsed}) => (isCollapsed ? 'flex' : 'none')};
  ${({isCollapsed}) => !isCollapsed && 'flex: 1'};
  height: 100%;
  width: 25px;
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

export const StyledGutter = styled.div`
  background-color: ${theme.color('backgroundBody')};
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: url(${drawerSymbol});
  height: 100%;

  &:hover {
    cursor: col-resize;
  }
`

export const StyledSplitPane = styled(Split)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  ${StyledGutter} {
    display: ${({isCollapsed}) => (isCollapsed ? 'none' : 'block')};
  }
`

export const StyledToggleCollapseButton = styled(Button)`
  font-size: ${scale.font(0)};
  padding: 0;
  ${({isCollapsed}) =>
    !isCollapsed &&
    css`
      position: relative;
      left: -4px;
      top: 2px;
    `}
  &:hover,
  &:focus,
  ${/* sc-selector */ StyledPlaceHolder}:hover & {
    background-color: transparent;
    color: ${theme.color('secondaryLight')};
  }
`
