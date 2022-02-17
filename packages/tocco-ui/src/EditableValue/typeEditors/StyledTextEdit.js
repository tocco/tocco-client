import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledTextareaAutosize = styled(({immutable, ...rest}) => <TextareaAutosize {...rest} />)`
  && {
    ${StyledInputCss}
    padding-top: 2px;
    padding-bottom: 2px;
  }
`

export default StyledTextareaAutosize