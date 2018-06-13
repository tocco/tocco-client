import styled from 'styled-components'

const StyledPanelBody = styled.div`
  height: ${props => props.isOpen ? props.heightIfOpen : '0'};
  overflow-y: auto;  /* if calculation does not work properly content is still accessible */
  transition: height 300ms ease-in-out;
`
export default StyledPanelBody
