import styled from 'styled-components'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText
} from '../utilStyles'

const StyledSpan = styled.span`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

export {StyledSpan}
