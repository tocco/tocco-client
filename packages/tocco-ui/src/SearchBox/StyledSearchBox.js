import styled from 'styled-components'

import {scale} from '../utilStyles'
import {StyledInputCss} from '../EditableValue/StyledEditableValue'

const StyledSearchBoxForm = styled.form`
  && {
    margin-bottom: ${scale.space(0)};
  }
`

const StyledSearchBoxInput = styled.input.attrs({
  type: 'text'
})`
  && {
    ${StyledInputCss}
  }
`

export {
  StyledSearchBoxForm,
  StyledSearchBoxInput
}
