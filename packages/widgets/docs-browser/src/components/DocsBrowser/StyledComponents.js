import styled from 'styled-components'
import {StyledScrollbar} from 'tocco-ui'

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'breadcrumbs'
    'content';
  ${({scrollBehaviour}) => scrollBehaviour === 'inline' && 'height: 100%;'}
  width: 100%;
`

export const StyledContent = styled.div`
  grid-area: content;
  ${({scrollBehaviour}) => scrollBehaviour === 'inline' && 'overflow-x: hidden;'}
  ${StyledScrollbar}
`

export const StyledBreadcrumbs = styled.div`
  grid-area: breadcrumbs;
  ${({noLeftPadding}) =>
    noLeftPadding &&
    `
    > div {
      padding-left: 0;
    }
  `}
`
