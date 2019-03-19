import styled from 'styled-components'
import _get from 'lodash/get'

import {shadeColor} from '../utilStyles'

const StyledPanel = styled.div`
  && {
    background-color: ${props => _get(props.theme, 'colors.paper')};
    border-width: 1px;
    border-style: ${props => props.isFramed ? 'solid' : 'none'};
    border-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
    border-radius: ${props => props.isFramed ? _get(props.theme, 'radii.regular') : 0};
  }
`
export default StyledPanel
