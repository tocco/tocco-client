import styled from 'styled-components'

import {StyledButton} from '../Button'
import {theme} from '../utilStyles'

const StyledPanelHeaderFooter = styled.div`
  && {
    display: flex;
    padding: ${props => props.isFramed ? '4px 8px 4px 8px' : 0};
    align-items: center;
 
    > div {
      flex: 1 1 auto;
    }

    ${StyledButton} {
      margin-left: auto;
      align-self: center;
      border: 0;
      background-color: transparent;
      
      &:hover, &:active, &:focus {
        color: ${theme.color('secondaryLight')}
      }
    }

    transition: border ${props => props.isOpen ? '300ms ease-in-out' : '1ms ease-in-out 299ms'};
    will-change: border;
  }
`
export default StyledPanelHeaderFooter
