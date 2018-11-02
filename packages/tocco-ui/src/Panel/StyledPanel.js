import styled from 'styled-components'
import {theme} from 'styled-system'

import {shadeColor} from '../utilStyles'

const StyledPanel = styled.div`
  && {
    background-color: ${props => theme('colors.paper')};
    border-width: 1px;
    border-style: ${props => props.isFramed ? 'solid' : 'none'};
    border-color: ${props => shadeColor(theme('colors.paper')(props), 1)};
    border-radius: ${props => props.isFramed ? theme('radii') : 0};
  }
`
export default StyledPanel
