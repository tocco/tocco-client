import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledPanelBody = styled.div`
  && {
    height: ${props => props.isOpen ? props.heightIfOpen : '0'};
    overflow-y: auto;  /* if calculation does not work properly content is still accessible */
    padding: 0 ${props => props.isFramed ? theme('space.4') : 0};
    padding: 0 ${props => props.isFramed ? '15px' : 0};

    transition:
      height 1000ms ease-in-out,
      padding 1000ms ease-in-out;

    > div {
      margin: ${props => props.isFramed ? theme('space.4') : 0} 0;
      margin: ${props => props.isFramed ? '20px' : 0} 0;
    }
  }
`
export default StyledPanelBody
