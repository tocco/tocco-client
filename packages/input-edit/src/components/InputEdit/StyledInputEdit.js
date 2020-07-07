import styled from 'styled-components'
import {scale, StyledScrollbar, theme} from 'tocco-ui'

const drawerSymbol = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==' // eslint-disable-line max-len

export const resizerStyle = {
  background: `transparent url(${drawerSymbol}) 50% no-repeat`,
  width: '11px',
  cursor: 'col-resize'
}

export const StyledSplitPanelWrapper = styled.div`
  && {
    background-color: ${theme.color('paper')};
    height: 100%;
    padding-right: ${scale.space(-1)};
    padding-left: ${scale.space(-1)};
    padding-top: ${scale.space(-1)};
    ${StyledScrollbar}
  }
`
