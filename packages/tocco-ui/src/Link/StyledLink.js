import styled from 'styled-components'
import _get from 'lodash/get'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText,
  theme,
  shadeColor
} from '../utilStyles'

const StyledLink = styled.a`
  ${declareFont()}
  ${({breakWords}) => breakWords ? declareWrappingText() : declareNoneWrappingText()}

  && {
    color: ${({neutral}) => neutral
    ? theme.color('text')
    : theme.color('secondary')};
    text-decoration: ${({neutral}) => neutral ? 'underline' : 'none'};

    &:hover,
    &:focus {
      color: ${({neutral, theme}) => neutral
    ? shadeColor(_get(theme, 'colors.text'), 1)
    : shadeColor(_get(theme, 'colors.secondary'), 1)};
      text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
    }

    &:active {
      color: ${({neutral, theme}) => neutral
    ? shadeColor(_get(theme, 'colors.text'), 2)
    : shadeColor(_get(theme, 'colors.secondary'), 2)};
      text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
    }
  }
`

export default StyledLink
