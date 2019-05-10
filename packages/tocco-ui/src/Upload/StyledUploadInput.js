import styled from 'styled-components'
import _get from 'lodash/get'

import {
  declareFont,
  scale,
  shadeColor,
  theme
} from '../utilStyles'

const StyledUploadInput = styled.div`
  ${declareFont()}
  cursor: ${props => props.readOnly ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.readOnly
    ? shadeColor(_get(props.theme, 'colors.paper'), 1)
    : theme.color('paper')};
  padding: ${scale.space(-2)} 0 0 0;
`

export default StyledUploadInput
