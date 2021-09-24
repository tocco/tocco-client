import styled from 'styled-components'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText,
  theme
} from '../utilStyles'

const StyledLink = styled.a`
  ${declareFont()}
  ${({breakWords}) => breakWords ? declareWrappingText() : declareNoneWrappingText()}

  && {
    color: ${theme.color('text')};
    text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};

    &:hover,
    &:focus {
      text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
    }

    &:active {
      text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
    }
  }
`

export default StyledLink
