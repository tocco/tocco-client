import styled, {css} from 'styled-components'
import {scale, StyledScrollbar, theme} from 'tocco-ui'

const drawerSymbol = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==' // eslint-disable-line max-len

export const resizerStyle = {
  background: `transparent url(${drawerSymbol}) 50% no-repeat`,
  width: '11px',
  cursor: 'col-resize'
}

export const StyledPaneWrapper = styled.div`
  display: flex;
  height: 100%;
`

const sharedSplitPaneStyles = css`
  height: calc(100% - ${scale.space(-1)}); //remove top padding from total height
  background-color: ${theme.color('paper')};
  padding-top: ${scale.space(-1)};
  ${StyledScrollbar}
`

export const StyledPanelWrapperLeft = styled.div`
  && {
    min-width: 350px;
    width: 16%;
    margin-right: 1rem;
    ${sharedSplitPaneStyles}
  }
`

export const StyledPanelWrapperRight = styled.div`
  && {
    width: calc(84% - 1rem);
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
