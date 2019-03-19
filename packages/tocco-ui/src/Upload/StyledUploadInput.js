import styled from 'styled-components'
import _get from 'lodash/get'

import {
  declareFocus,
  declareFont,
  shadeColor,
  scale
} from '../utilStyles'

const StyledUploadInput = styled.div`
  ${props => declareFont(props)}
  border: dashed 1px ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
  border-radius: ${props => _get(props.theme, 'radii.regular')};
  padding: ${props => scale.space(props.theme, -2)} ${props => scale.space(props.theme, -1)};
  cursor: pointer;
  ${props => declareFocus(props)}

  &[aria-disabled="true"] {
    cursor: no-drop;
    text-decoration: line-through;
  }
`

export default StyledUploadInput
