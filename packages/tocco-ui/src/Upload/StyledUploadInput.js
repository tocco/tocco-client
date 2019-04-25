import styled from 'styled-components'
import _get from 'lodash/get'

import {
  declareFocus,
  declareFont,
  shadeColor,
  scale,
  theme
} from '../utilStyles'

const StyledUploadInput = styled.div`
  ${declareFont()}
  border: dashed 1px ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
  border-radius: ${theme.radii('regular')};
  padding: ${scale.space(-2)} ${scale.space(-1)};
  cursor: ${props => props.readOnly ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.readOnly
    ? shadeColor(_get(props.theme, 'colors.paper'), 1)
    : theme.color('paper')};
  ${props => declareFocus(props)}

  &[aria-disabled="true"] {
    cursor: no-drop;
    text-decoration: line-through;
  }
`

export default StyledUploadInput
