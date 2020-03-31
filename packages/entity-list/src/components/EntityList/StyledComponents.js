import styled from 'styled-components'

export const TopPositioning = styled.div`
  height: 100%;
  display: grid;
  grid-row-gap: 8px;
  grid-template-areas:
    'search'
    'list';
  grid-auto-rows: auto 1fr;
`

export const LeftPositioning = styled.div`
  display: grid;
  grid-template-columns: minmax(400px, 22%) auto;
  grid-column-gap: 2rem;
  grid-template-areas: 'search list';

  @media (max-width: 600px) {
    grid-column-gap: 8px;
  }
`

export const SearchGrid = styled.div`
  grid-area: search;
`

export const ListGrid = styled.div`
  grid-area: list;
`
