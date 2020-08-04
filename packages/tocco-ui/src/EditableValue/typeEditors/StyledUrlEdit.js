import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledUrlEdit = styled.input.attrs(props => ({
  type: 'url'
}))`
  && {
    ${StyledInputCss}
  }
`

export default StyledUrlEdit
