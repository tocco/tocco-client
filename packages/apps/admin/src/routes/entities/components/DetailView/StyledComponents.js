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
  /* Only show one panel at a time on screens <= 500px */
  display: ${({windowWidth, isRightPaneCollapsed}) => windowWidth <= 500 && !isRightPaneCollapsed && 'none'};
`

export const StyledDetailViewRight = styled.div`
  flex: ${({isRightPaneCollapsed}) => (isRightPaneCollapsed ? '0' : '1')};
`
