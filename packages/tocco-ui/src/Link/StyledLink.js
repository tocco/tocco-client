import styled from 'styled-components'
import {theme} from 'styled-system'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText
} from '../utilStyles'

const StyledLink = styled.a`
  ${props => declareFont(props)}
  ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}

  && {
    color: ${theme('colors.primary.line.0')}
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${theme('colors.primary.line.1')}
    }

    &:active {
      color: ${theme('colors.primary.line.2')}
    }
  }
`

export default StyledLink
