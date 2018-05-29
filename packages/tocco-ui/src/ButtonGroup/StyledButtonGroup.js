import styled from 'styled-components'
import {theme} from 'styled-system'

import {
  declareElevation,
  stylingLook
} from '../utilStyles'

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

    border-radius: ${props => props.melt === true ? theme('radii.3') : 0};
    /*
      SCR_TEMP reactivate
      ${props => declareElevation(props, props.look === stylingLook.RAISED && props.melt === true ? 1 : 0)}
    */
  }
`

export default StyledButtonGroup
