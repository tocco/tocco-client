import styled from 'styled-components'

export const StyledDetailViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

  .react-bs-container-body {
    height: auto !important;
  }
`

export const StyledDetailViewLeft = styled.div`
  flex: 1;
  margin-right: 1rem;
  ${({isCollapsed}) => !isCollapsed
  && ` @media(max - width: 1024px) {
      flex: none;
      width: 40%;
    }`
}
`

export const StyledDetailViewRight = styled.div`
  flex: ${({isCollapsed}) => isCollapsed ? '0' : '1'};
`
