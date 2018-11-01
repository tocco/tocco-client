import styled from 'styled-components'
import {theme} from 'styled-system'

import {spaceScale} from '../utilStyles'

const StyledButtonGroup = styled.div`
  && {
    display: flex;
    flex-flow: row wrap;
    width: fit-content;
    margin-bottom: ${props => props.melt ? 0 : `-${spaceScale(props, -1)}`};

    a,
    button {
      margin-bottom: ${props => props.melt ? 0 : spaceScale(props, -1)};
    }

    border-radius: ${props => props.melt ? theme('radii') : 0};
  }
`

export default StyledButtonGroup
