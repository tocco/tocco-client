import styled from 'styled-components'
import _get from 'lodash/get'

import {
  shadeColor,
  theme
} from '../utilStyles'

const StyledPanel = styled.div`
  && {
    background-color: ${props => theme.color('paper')};
    border-width: 1px;
    border-style: ${props => props.isFramed ? 'solid' : 'none'};
    border-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
  }
`
export default StyledPanel
