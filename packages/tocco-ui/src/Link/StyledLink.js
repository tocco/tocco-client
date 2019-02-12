import styled from 'styled-components'
import {theme} from 'styled-system'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText,
  shadeColor
} from '../utilStyles'

const StyledLink = styled.a`
  ${props => declareFont(props)}
  ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}

  && {
    color: ${props => props.neutral
    ? theme('colors.text')
    : theme('colors.primary')};
    text-decoration: ${props => props.neutral ? 'underline' : 'none'};

    &:hover,
    &:focus {
      color: ${props => props.neutral
    ? shadeColor(theme('colors.text')(props), 1)
    : shadeColor(theme('colors.primary')(props), 1)};
      text-decoration: ${props => props.neutral ? 'none' : 'underline'};
    }

    &:active {
      color: ${props => props.neutral
    ? shadeColor(theme('colors.text')(props), 2)
    : shadeColor(theme('colors.primary')(props), 2)};
      text-decoration: ${props => props.neutral ? 'none' : 'underline'};
    }
  }
`

export default StyledLink
