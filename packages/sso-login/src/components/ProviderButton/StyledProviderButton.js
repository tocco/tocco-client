import styled from 'styled-components'
import {theme} from 'styled-system'

export default styled.button`
  && {
    background-color: ${props => props.primaryColor};
    border-color: ${props => props.primaryColor};
    color: ${props => props.secondaryColor};
    width:100%;
    height: 30px;
        border-radius: ${theme('radii.2')};
  }
`
