import styled from 'styled-components'

const StyledPanelBody = styled.div`
  && {
    padding: 0 ${({isFramed}) => isFramed ? '10px' : 0};
    display: ${({isOpen}) => isOpen ? 'block' : 'none'};

    > div {
      padding: ${({isFramed}) => isFramed ? '10px' : 0} 0 0 0;
    }

    table {
      position: static;
    }
  }
`
export default StyledPanelBody
