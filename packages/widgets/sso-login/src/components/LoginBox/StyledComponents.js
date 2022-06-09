import styled from 'styled-components'

export const StyledButtonContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

  @media (max-width: 1024px) {
    margin-top: 1.5rem;
  }
`
