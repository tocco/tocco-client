import styled from 'styled-components'
import {theme} from 'tocco-ui'

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'breadcrumbs'
    'content';
  height: 100%;
  width: 100%;
`

export const StyledBreadcrumbs = styled.div`
  grid-area: breadcrumbs;
`

export const StyledDashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color('backgroundBody')};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  grid-area: content;

  @media (max-width: 568px) {
    justify-content: center;
    align-items: center;
  }
`
