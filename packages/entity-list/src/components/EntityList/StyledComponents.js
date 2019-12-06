import styled from 'styled-components'

export const TopPositioning = styled.div`
  display: grid;
  grid-row-gap: 6px;
  grid-template-areas:
    "search"
    "list";
`

export const LeftPositioning = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 18%) auto;
  grid-column-gap: 15px;
  @media (max-width: 600px) {
    grid-column-gap: 8px;
  }

  grid-template-areas: "search list";
`

export const SearchGrid = styled.div`
  grid-area: search;
  margin-bottom: 1rem;
`

export const ListGrid = styled.div`
  grid-area: list;
`
