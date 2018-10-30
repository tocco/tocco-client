import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledPanel = styled.div`
  && {
    border-width: 1px;
    border-style: ${props => props.isFramed ? 'solid' : 'none'};
    border-color: ${props => theme('colors.base.fill.2')};
    border-radius: ${theme('radii')};
  }
`
export default StyledPanel
