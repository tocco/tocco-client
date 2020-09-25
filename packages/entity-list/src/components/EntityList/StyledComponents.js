import styled from 'styled-components'

export const TopPositioning = styled.div`
  height: 100%;
  display: grid;
  row-gap: 8px;
  grid-template-areas:
    'search'
    'list';
  grid-auto-rows: auto 1fr;
`

export const LeftPositioning = styled.div`
  display: grid;
  grid: 'search list' / minmax(350px, 16%) auto;
  column-gap: 1rem;

  @media (max-width: 600px) {
    column-gap: 8px;
  }
`

export const SearchGrid = styled.div`
  grid-area: search;
`

export const ListGrid = styled.div`
  grid-area: list;
  display: flex;
`
