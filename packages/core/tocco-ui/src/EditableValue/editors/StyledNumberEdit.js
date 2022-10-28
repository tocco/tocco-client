import {NumericFormat} from 'react-number-format'
import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledNumberEdit = styled(({immutable, ...rest}) => <NumericFormat {...rest} />)`
  && {
    ${StyledInputCss}
  }
`

export default StyledNumberEdit
