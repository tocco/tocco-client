import NumberFormat from 'react-number-format'
import styled from 'styled-components'

import {StyledInputCss} from '../StyledEditableValue'

const StyledNumberEdit = styled(({immutable, ...rest}) => <NumberFormat {...rest} />)`
  && {
    ${StyledInputCss}
  }
`

export default StyledNumberEdit
