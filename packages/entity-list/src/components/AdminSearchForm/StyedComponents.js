import styled from 'styled-components'
import {StyledScrollbar, theme, Menu, Button, scale} from 'tocco-ui'
import Split from 'react-split'

export const StyledSplit = styled(Split)``

export const StyledSplitWrapper = styled.div`
  height: 100%;
`

export const StyledHeader = styled.div`
  background-color: ${theme.color('paper')};
  border-bottom: 3px solid ${theme.color('backgroundBody')};
  display: flex;
  justify-content: flex-end;
  padding: 9px;
  position: relative;
  z-index: 2; // higher than StyledTether to prevent cover on scroll

  ${Menu} {
    z-index: 3; //higher than rest to lay over search filter list
  }
`

export const AdminSearchGrid = styled.div`
  display: ${({isCollapsed}) => isCollapsed ? 'none' : 'block'};
  height: 100%;
  overflow: hidden;

  ${StyledSplit} {
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
  }
`

export const StyledPlaceHolder = styled.div`
  display: ${({isCollapsed}) => isCollapsed ? 'flex' : 'none'};
  flex: 1;
  background: ${theme.color('paper')};
  padding-top: ${scale.space(-0.5)};
  padding-left: ${scale.space(-2.5)};

  &:hover {
    cursor: pointer;
  }
`

export const StyledToggleCollapseButton = styled(Button)`
  font-size: ${scale.font(2.5)};
  padding: 0;
  margin-right: auto;
  position: relative;
  left: -${({isCollapsed}) => !isCollapsed ? scale.space(-1.5) : 0};

  &:hover,
  ${/* sc-selector */StyledPlaceHolder}:hover & {
    background-color: transparent;
    color: ${theme.color('secondaryLight')};
  }
`

export const Box = styled.div`
  background-color: ${theme.color('paper')};
  overflow-y: auto;
  padding: .6rem 1rem 0 .6rem;
  position: relative;

  &:first-of-type {
    z-index: 2; // higher than StyledTether to prevent cover on scroll
  }
  ${StyledScrollbar}
`

export const StyledGutter = styled.div`
  background-color: ${theme.color('paper')};
  display: flex;
  padding-top: 3px;
  justify-content: center;
  align-items: center;
  height: calc(100% - 1px); //subtract border height from total height
  font-size: 20px;
  border-top: 1px solid ${theme.color('backgroundBody')};
  position: relative;
  z-index: 2;

  &:hover {
    cursor: row-resize;
  }
`
