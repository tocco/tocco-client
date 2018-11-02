import styled from 'styled-components'
import {theme} from 'styled-system'

import {
  shadeColor,
  spaceScale
} from '../utilStyles'

const StyledUploadInput = styled.div`
  border: dashed 1px ${props => shadeColor(theme('colors.paper')(props), 1)};
  border-radius: ${theme('radii')};
  padding: ${props => spaceScale(props, -2)} ${props => spaceScale(props, -1)};
  cursor: pointer;

  &[aria-disabled="true"] {
    cursor: no-drop;
    text-decoration: line-through;
  }
`

export default StyledUploadInput
