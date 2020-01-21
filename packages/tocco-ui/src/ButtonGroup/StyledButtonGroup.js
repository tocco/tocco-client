import styled from 'styled-components'

import {
  scale,
  theme
} from '../utilStyles'
import {StyledButton} from '../Button'

const StyledButtonGroup = styled.div`
  && {
  &&& > ${StyledButton} {

    :not(:first-child) {
            margin-left: 0;
     
         border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      }
      
    :not(:last-child) {
        margin-right: 0;
        border-right: 0;
           border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      }
      
      
  } 
  
    display: flex;
    flex-flow: row wrap;
    width: fit-content;
    margin-bottom: ${props => props.melt ? 0 : `-${scale.space(-1)(props)}`};

    a,
    button {
      margin-bottom: ${props => props.melt ? 0 : scale.space(-1)(props)};
    }

    border-radius: ${props => props.melt ? theme.radii('regular') : 0};
  }
  
 
`

export default StyledButtonGroup
