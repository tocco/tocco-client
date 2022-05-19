import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'breadcrumbs'
    'content';
  height: 100%;
  width: 100%;
`

export const StyledContent = styled.div`
  grid-area: content;
  overflow: hidden;
`

export const StyledBreadcrumbs = styled.div`
  grid-area: breadcrumbs;
`
