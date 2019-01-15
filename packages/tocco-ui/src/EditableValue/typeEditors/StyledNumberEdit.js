import styled from 'styled-components'
import NumberFormat from 'react-number-format'

import {StyledInputCss} from '../StyledEditableValue'

const StyledNumberEdit = styled(NumberFormat)`
  && {
    ${StyledInputCss}
  }
`

export default StyledNumberEdit
