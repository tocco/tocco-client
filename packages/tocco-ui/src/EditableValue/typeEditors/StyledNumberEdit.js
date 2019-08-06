import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

import {StyledInputCss} from '../StyledEditableValue'

const StyledNumberEdit = styled(({immutable, ...rest}) => <NumberFormat {...rest} />)`
  && {
    ${StyledInputCss}
  }
`

export default StyledNumberEdit
