import styled from 'styled-components'
import _get from 'lodash/get'

import {
  shadeColor,
  theme
} from '../utilStyles'

const StyledPanel = styled.div`
  && {
    background-color: ${theme.color('paper')};
    border-width: 1px;
    border-style: ${({isFramed}) => isFramed ? 'solid' : 'none'};
    border-color: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 1)};
  }
`
export default StyledPanel
