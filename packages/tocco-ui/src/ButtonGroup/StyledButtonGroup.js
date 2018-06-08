import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledButtonGroup = styled.div`
  && {
    display: flex;
    flex-flow: row wrap;
    width: fit-content;
    margin-bottom: -${props => props.melt ? 0 : theme('space.4')};

    a,
    button {
      margin-bottom: ${props => props.melt ? 0 : theme('space.4')};
    }

    border-radius: ${props => props.melt ? theme('radii.2') : 0};
  }
`

export default StyledButtonGroup
