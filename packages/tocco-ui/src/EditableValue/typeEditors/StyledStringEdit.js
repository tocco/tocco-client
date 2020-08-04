import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledStringEdit = styled.input.attrs(props => ({
  type: 'text'
}))`
  && {
    ${StyledInputCss}
  }
`

export default StyledStringEdit
