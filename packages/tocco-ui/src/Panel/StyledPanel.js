import styled from 'styled-components'
import {lighten} from 'polished'

import {
  theme
} from '../utilStyles'

const StyledPanel = styled.div`
  && {
    background-color: ${theme.color('paper')};
    border: 1px
      ${({isFramed}) => isFramed ? 'solid' : 'none'}
      ${({theme}) => lighten(0.93, theme.colors.text)};
  }
`
export default StyledPanel
