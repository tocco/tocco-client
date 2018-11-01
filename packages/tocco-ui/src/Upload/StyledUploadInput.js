import styled from 'styled-components'
import {theme} from 'styled-system'

import {spaceScale} from '../utilStyles'

const StyledUploadInput = styled.div`
  border: dashed 1px ${theme('colors.base.fill.2')};
  border-radius: ${theme('radii')};
  padding: ${props => spaceScale(props, -2)} ${props => spaceScale(props, -1)};
  cursor: pointer;

  &[aria-disabled="true"] {
    cursor: no-drop;
    text-decoration: line-through;
  }
`

export default StyledUploadInput
