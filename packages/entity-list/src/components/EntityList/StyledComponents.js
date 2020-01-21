import styled from 'styled-components'

export const TopPositioning = styled.div`
  display: grid;
  grid-row-gap: 2px;
  grid-template-areas:
    "search"
    "list";
`

export const LeftPositioning = styled.div`
  display: grid;
  grid-template-columns: minmax(400px, 22%) auto;
  grid-column-gap: 2rem;
  @media (max-width: 600px) {
    grid-column-gap: 8px;
  }

  grid-template-areas: "search list";
`

export const SearchGrid = styled.div`
  grid-area: search;
`

export const ListGrid = styled.div`
  grid-area: list;
  
  .react-bs-table-container {
    position: relative;
  }
`
