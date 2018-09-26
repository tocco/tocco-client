import styled from 'styled-components'

const drawerSymbol = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==' // eslint-disable-line max-len

const StyledResourceScheduler = styled.div`
  && {
    .spit-panel-wrapper {
      height: 100%;
      overflow: auto;
      padding: 8px;
    }

    .Resizer.vertical {
      background-color: transparent;
      background-image: url(${drawerSymbol});
      background-position: 50%;
      background-repeat: no-repeat;
      width: 11px;
      cursor: col-resize;
    }
  }
`

export default StyledResourceScheduler
