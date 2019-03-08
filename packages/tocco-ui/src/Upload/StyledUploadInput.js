import styled from 'styled-components'
import {theme} from 'styled-system'

import {
  declareFocus,
  declareFont,
  shadeColor,
  scale
} from '../utilStyles'

const StyledUploadInput = styled.div`
  ${props => declareFont(props)}
  border: dashed 1px ${props => shadeColor(theme('colors.paper')(props), 1)};
  border-radius: ${theme('radii.regular')};
  padding: ${props => scale.space(props, -2)} ${props => scale.space(props, -1)};
  cursor: pointer;
  ${props => declareFocus(props)}

  &[aria-disabled="true"] {
    cursor: no-drop;
    text-decoration: line-through;
  }
`

export default StyledUploadInput
