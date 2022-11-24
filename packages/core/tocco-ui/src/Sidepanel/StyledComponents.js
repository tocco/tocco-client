import styled from 'styled-components'

import Ball from '../Ball'
import {StyledScrollbar} from '../Layout'
import {Menu} from '../Menu'
import {scale, theme} from '../utilStyles'

export const TopPositioning = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  row-gap: 8px;
  grid-template-areas:
    'sidepanel'
    'content';
  grid-auto-rows: auto minmax(auto, 1fr);
  grid-template-columns: minmax(100%, 700px);
`

export const LeftPositioning = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  column-gap: 1rem;
  /* only show one panel at a time on screens <= 500px */
  grid: ${({isCollapsed, windowWidth}) =>
    (windowWidth <= 500 && !isCollapsed && `'sidepanel content' / 100% 0`) ||
    (!isCollapsed && `'sidepanel content' / minmax(350px, 16%) auto`) ||
    `'sidepanel content' / 25px auto`};

  @media (max-width: 600px) {
    column-gap: 8px;
  }
`

export const StyledSidepanel = styled.div`
  grid-area: sidepanel;
  min-height: 50px; /* prevent collapse on shorter screens */
  ${({scrollBehaviour}) => scrollBehaviour === 'inline' && 'overflow-y: auto;'}

  /* Limit height when positioned top */
  ${/* sc-selector */ TopPositioning} && {
    ${({scrollBehaviour}) => (scrollBehaviour === 'inline' ? 'max-height: 200px;' : 'max-height: none;')}
    padding-right: ${scale.space(-0.5)};
    ${StyledScrollbar}
  }
`

export const StyledSidepanelMainContent = styled.div`
  grid-area: content;
  display: flex;
`

export const StyledSidepanelLeftContentWrapper = styled.div`
  display: flex; // enables StyledSidepanelCollapsed to take full height
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${theme.color('paper')};
`

export const StyledSidepanelTopContentWrapper = styled.div``

export const StyledSidepanelContent = styled.div`
  display: ${({isCollapsed}) => (isCollapsed ? 'none' : 'block')};
  height: 100%;
  overflow: hidden;
`

export const StyledSidepanelCollapsed = styled.div`
  display: ${({isCollapsed}) => (isCollapsed ? 'flex' : 'none')};
  flex: 1;
  align-items: flex-start;
  background: ${theme.color('paper')};
  padding-top: ${scale.space(-0.5)};
  padding-left: ${scale.space(-2.5)};

  &:hover {
    cursor: pointer;
  }
`

export const StyledToggleCollapseButton = styled(Ball)`
  font-size: ${scale.font(0)};
  margin-right: auto;
  position: relative;
  left: ${({isCollapsed}) => (!isCollapsed ? '-5px' : '0.5px')};

  &:hover,
  ${/* sc-selector */ StyledSidepanelCollapsed}:hover & {
    background-color: transparent;
    color: ${theme.color('secondaryLight')};
  }
`

export const StyledSidepanelHeader = styled.div`
  background-color: ${theme.color('paper')};
  border-bottom: 3px solid ${theme.color('backgroundBody')};
  display: flex;
  justify-content: flex-end;
  padding: ${scale.space(-0.53)};
  position: relative;
  z-index: 2; // higher than StyledTether to prevent cover on scroll

  ${Menu} {
    z-index: 3; //higher than rest to lay over search filter list
  }
`
