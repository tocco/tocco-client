import {lighten} from 'polished'
import styled from 'styled-components'

import {themeSelector} from '../utilStyles'

const StyledPanel = styled.div`
  && {
    background-color: ${themeSelector.color('paper')};
    border: 1px ${({isFramed}) => (isFramed ? 'solid' : 'none')} ${({theme}) => lighten(0.93, theme.colors.text)};
  }
`
export default StyledPanel
