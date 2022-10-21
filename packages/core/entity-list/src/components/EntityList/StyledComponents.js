import styled from 'styled-components'
import {scale, StyledScrollbar} from 'tocco-ui'

export const TopPositioning = styled.div`
  height: 100%;
  display: grid;
  row-gap: 8px;
  grid-template-areas:
    'search'
    'list';
  grid-auto-rows: auto minmax(auto, 1fr);

  /* remove bottom space and set width in modal */
  ${({searchFormType}) =>
    searchFormType !== 'simple' &&
    `
    grid-template-columns: minmax(100%, 700px);
  `}
`

export const LeftPositioning = styled.div`
  display: grid;
  height: 100%; /* use full height available */
  column-gap: 1rem;
  /* only show one panel at a time on screens <= 500px */
  grid: ${({isCollapsed, windowWidth}) =>
    (windowWidth <= 500 && !isCollapsed && `'search list' / 100% 0`) ||
    (!isCollapsed && `'search list' / minmax(350px, 16%) auto`) ||
    `'search list' / 25px auto`};

  @media (max-width: 600px) {
    column-gap: 8px;
  }
`

export const SearchGrid = styled.div`
  grid-area: search;
  min-height: 50px; /* prevent collapse on shorter screens */
  ${({scrollBehaviour, searchFormType}) =>
    scrollBehaviour === 'inline' && searchFormType !== 'simple' && 'overflow-y: auto;'}

  /* Limit height when positioned top */
  ${/* sc-selector */ TopPositioning} && {
    ${({scrollBehaviour}) => (scrollBehaviour === 'inline' ? 'max-height: 200px;' : 'max-height: none;')}
    padding-right: ${scale.space(-0.5)};
    ${StyledScrollbar}
  }
`

export const ListGrid = styled.div`
  grid-area: list;
  display: flex;
`
