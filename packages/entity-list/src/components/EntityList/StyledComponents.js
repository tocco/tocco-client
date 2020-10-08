import styled from 'styled-components'

export const TopPositioning = styled.div`
  height: 100%;
  display: grid;
  row-gap: 8px;
  grid-template-areas:
    'search'
    'list';
  grid-auto-rows: auto minmax(400px, 1fr);
  /* safari only fix to ensure proper height in modal */
  @media not all and (min-resolution: .001dpcm)
    { @supports (-webkit-appearance:none) and (stroke-color: transparent) {
      grid-auto-rows: auto 1fr;
    }
  }

  /* remove bottom space and set width in modal */
  ${({searchFormType}) => searchFormType !== 'simple' && `
    margin-bottom: -25px;
    grid-template-columns: minmax(100%, 700px);
  `
  }
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

  /* safari only fix to ensure proper height in modal */
  ${({searchFormType}) => searchFormType !== 'simple' && `
    @media not all and (min-resolution: .001dpcm)
    { @supports (-webkit-appearance:none) and (stroke-color: transparent) {
      height: -webkit-fit-content;
      }
    }
  `
  }
`
