import styled from 'styled-components'
import {scale} from 'tocco-ui'

const drawerSymbol = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==' // eslint-disable-line max-len

export const resizerStyle = {
  background: `transparent url(${drawerSymbol}) 50% no-repeat`,
  width: '11px',
  cursor: 'col-resize'
}

export const StyledSplitPanelWrapperLeft = styled.div`
  && {
    height: 100%;
    overflow: auto;
    padding-right: ${scale.space(-1)};
  }
`

export const StyledSplitPanelWrapperRight = styled.div`
  && {
    height: 100%;
    overflow: auto;
    padding-left: ${scale.space(-1)};
  }
`
