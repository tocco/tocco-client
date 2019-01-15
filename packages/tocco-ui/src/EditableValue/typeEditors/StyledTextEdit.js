import TextareaAutosize from 'react-autosize-textarea'
import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledTextareaAutosize = styled(TextareaAutosize)`
  && {
    ${StyledInputCss}
  }
`

export default StyledTextareaAutosize
