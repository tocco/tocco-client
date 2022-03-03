import Split from 'react-split'
import styled from 'styled-components'
import {scale, StyledScrollbar, theme} from 'tocco-ui'

export const StyledSplitPanelWrapperLeft = styled.div`
  && {
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

export const StyledSplitPane = styled(Split)`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const drawerSymbol =
  // eslint-disable-next-line max-len
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg=='

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
