import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledPhoneEdit = styled.input.attrs(props => ({
  type: 'tel'
}))`
  && {
    ${StyledInputCss}
  }
`

export default StyledPhoneEdit
