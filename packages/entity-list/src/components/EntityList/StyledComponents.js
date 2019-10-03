import styled from 'styled-components'

export const TopContainer = styled.div`
  display: grid;
  grid-row-gap: 12px;
  grid-template-areas:
    "search"
    "list";
`

export const LeftContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 18%) auto;
  grid-column-gap: 15px;
  @media (max-width: 600px) {
    grid-column-gap: 8px;
  }

  grid-template-areas: "search list";
`

export const SearchContainer = styled.div`
  grid-area: search;
  overflow: auto;
`

export const ListContainer = styled.div`
  grid-area: list;
`
