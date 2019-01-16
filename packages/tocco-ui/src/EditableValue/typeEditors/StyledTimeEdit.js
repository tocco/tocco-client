import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledTimeEdit = styled.input.attrs({
  type: 'time'
})`
  && {
    ${StyledInputCss}
  }
`

export default StyledTimeEdit
