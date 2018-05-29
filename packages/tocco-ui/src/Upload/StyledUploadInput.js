import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledUploadInput = styled.div`
  border: dashed 1px ${theme('colors.base.fill.2')};
  border-radius: ${theme('radii.2')};
  padding: ${theme('space.3')} ${theme('space.4')};
  cursor: pointer;

  &[aria-disabled="true"] {
    cursor: no-drop;
    text-decoration: line-through;
  }
`

export default StyledUploadInput
