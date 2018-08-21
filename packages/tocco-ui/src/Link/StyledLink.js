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
    color: ${props => props.neutral ? theme('colors.base.text') : theme('colors.primary.line.0')};
    text-decoration: ${props => props.neutral ? 'underline' : 'none'};

    &:hover,
    &:focus {
      color: ${props => props.neutral ? theme('colors.base.text') : theme('colors.primary.line.1')};
      text-decoration: ${props => props.neutral ? 'none' : 'underline'};
    }

    &:active {
      color: ${props => props.neutral ? theme('colors.base.text') : theme('colors.primary.line.2')};
      text-decoration: ${props => props.neutral ? 'none' : 'underline'};
    }
  }
`

export default StyledLink
